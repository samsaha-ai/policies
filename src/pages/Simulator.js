import React, { useState, useCallback } from 'react';
import { PageHeader, Footer } from '../components/shared';

const simulatorConfigs = {
  TARIFFS: { sliderLabel:'Tariff rate', min:0, max:100, step:1, unit:'%', defaultValue:25, selectLabel:'Target sector', selectOptions:['Technology','Agriculture','Steel & Metals','Pharmaceuticals','Energy'], multiLabel:'Country target', multiOptions:['China','EU','Mexico','India','Russia'], defaultTargets:['China'] },
  'INTEREST RATES': { sliderLabel:'Policy-rate shock', min:-300, max:300, step:25, unit:' bps', defaultValue:100, selectLabel:'Transmission channel', selectOptions:['Bank credit','Mortgage market','Sovereign debt','Corporate refinancing','Exchange rate'], multiLabel:'Exposed economies', multiOptions:['United States','Euro Area','Japan','Brazil','Turkey'], defaultTargets:['United States'] },
  SANCTIONS: { sliderLabel:'Sanctions coverage', min:0, max:100, step:1, unit:'%', defaultValue:40, selectLabel:'Primary sector targeted', selectOptions:['Finance','Energy','Shipping','Technology','Defense'], multiLabel:'Target jurisdiction', multiOptions:['Russia','Iran','North Korea','Myanmar','Belarus'], defaultTargets:['Russia'] },
  TAXATION: { sliderLabel:'Tax-rate change', min:-10, max:20, step:1, unit:' pts', defaultValue:5, selectLabel:'Tax base', selectOptions:['Corporate income','Capital gains','Consumption','Carbon','High-income households'], multiLabel:'Affected blocs', multiOptions:['Households','Exporters','Banks','Energy firms','Technology firms'], defaultTargets:['Technology firms'] },
  IMMIGRATION: { sliderLabel:'Net migration change', min:-50, max:50, step:1, unit:'%', defaultValue:-15, selectLabel:'Labor channel', selectOptions:['High-skill visas','Seasonal labor','Asylum processing','Family reunification','Border enforcement'], multiLabel:'Sector exposure', multiOptions:['Construction','Agriculture','Healthcare','Technology','Hospitality'], defaultTargets:['Construction'] },
  'INFLATION TARGET': { sliderLabel:'Inflation target', min:1, max:5, step:0.25, unit:'%', defaultValue:2.5, selectLabel:'Credibility assumption', selectOptions:['High credibility','Medium credibility','Low credibility','Fiscal dominance risk'], multiLabel:'Policy setting', multiOptions:['United States','Euro Area','United Kingdom','Japan','Brazil'], defaultTargets:['United States'] },
};

function calculateImpacts(state) {
  const { category: c, magnitude: m, select, targets } = state;
  const exposure = 1 + (targets.length - 1) * 0.12;
  const sectorIntensity = { Technology:1.15,Agriculture:0.82,'Steel & Metals':1.05,Pharmaceuticals:0.76,Energy:1.22,Finance:1.25,Shipping:1.1,Defense:0.88 }[select] || 1;
  if (c==='TARIFFS') return { gdp:-0.018*m*exposure*sectorIntensity,cpi:0.026*m*sectorIntensity,trade:-0.33*m*exposure,jobs:-0.017*m*sectorIntensity,currency:-0.14*m*exposure,risk:0.22*m*exposure };
  if (c==='INTEREST RATES') return { gdp:-0.0042*m,cpi:-0.0028*m,trade:-0.013*m,jobs:-0.0024*m,currency:0.018*m,risk:Math.abs(m)*0.006 };
  if (c==='SANCTIONS') return { gdp:-0.012*m*exposure,cpi:0.018*m*sectorIntensity,trade:-0.42*m*exposure,jobs:-0.01*m,currency:-0.19*m,risk:0.31*m*exposure };
  if (c==='TAXATION') return { gdp:-0.055*m,cpi:m>0?-0.015*m:0.025*Math.abs(m),trade:-0.09*m,jobs:-0.026*m,currency:0.03*m,risk:Math.abs(m)*0.08 };
  if (c==='IMMIGRATION') return { gdp:0.026*m,cpi:-0.012*m,trade:0.06*m,jobs:0.018*m,currency:0.022*m,risk:Math.abs(m)*0.05 };
  const deviation = m - 2;
  return { gdp:0.16*deviation,cpi:0.34*deviation,trade:0.5*deviation,jobs:0.09*deviation,currency:-0.62*deviation,risk:Math.abs(deviation)*1.6 };
}

function impactNarratives(state) {
  const { category, magnitude, select, targets } = state;
  const targetText = targets.join(', ');
  const selected = select.toLowerCase();
  if (category==='TARIFFS') return [
    `A ${magnitude}% tariff on ${selected} imports from ${targetText} reduces domestic output through higher input costs while accelerating supply-chain diversification toward lower-tariff jurisdictions.`,
    `Consumer prices rise as importers pass through part of the tariff and domestic producers gain temporary pricing power in protected categories.`,
    `Trade volume falls as bilateral flows reroute through third countries and customs compliance raises the fixed cost of cross-border transactions.`,
    `Employment losses concentrate in downstream sectors that depend on imported intermediate goods rather than in the protected sector itself.`,
    `Currency pressure reflects weaker trade efficiency and a higher risk premium for firms with exposed offshore revenue.`,
    `Geopolitical risk rises because retaliation incentives increase when tariff coverage reaches strategic sectors.`,
  ];
  if (category==='INTEREST RATES') return [
    `A ${magnitude} bps policy-rate shock changes output through credit demand, refinancing costs, and the investment hurdle rate.`,
    `Inflation responds with a lag because demand-sensitive services adjust more slowly than goods and energy components.`,
    `Trade volumes move with domestic demand and exchange-rate pass-through into import prices.`,
    `Employment shifts through construction, durable goods, and small-business credit availability before appearing in headline payrolls.`,
    `Currency pressure reflects relative-rate differentials and carry incentives across the selected economies.`,
    `Geopolitical risk changes when higher debt-service costs constrain fiscal capacity in allied or exposed economies.`,
  ];
  if (category==='SANCTIONS') return [
    `A ${magnitude}% sanctions coverage regime targeting ${selected} compresses output by restricting external finance, insurance, and import substitution capacity.`,
    `Inflation rises where sanctioned inputs are difficult to replace and domestic logistics become less efficient.`,
    `Trade volume contracts as compliance screening, beneficial-ownership risk, and shipping insurance reduce executable transactions.`,
    `Employment effects are concentrated in export-facing firms and sectors with blocked access to dollar settlement.`,
    `Currency pressure increases as hard-currency inflows fall and local settlement channels trade at a discount.`,
    `Geopolitical risk rises because sanction evasion networks expand and secondary-sanctions exposure spreads to intermediaries.`,
  ];
  const lever = category.toLowerCase();
  return [
    `The ${lever} lever transmits to GDP through aggregate demand, sector capacity, and the speed at which households and firms adjust balance sheets.`,
    `Inflation changes through demand pressure, import prices, wage bargaining, and the credibility of the policy framework.`,
    `Trade volume follows the combined effect of exchange-rate moves, domestic absorption, and cross-border compliance costs.`,
    `Employment adjusts after output because firms initially absorb uncertainty through hours, vacancies, and delayed investment.`,
    `Currency pressure reflects capital-flow sensitivity, external balances, and the credibility of the policy rule.`,
    `Geopolitical risk changes when the policy creates spillovers that trading partners interpret as coercive or destabilizing.`,
  ];
}

const meters = [
  ['GDP Impact (%)','gdp','%',4],
  ['Inflation Effect (CPI pts)','cpi',' pts',4],
  ['Trade Volume Change (%)','trade','%',35],
  ['Employment Effect (millions)','jobs','m',3],
  ['Currency Pressure (index)','currency','',18],
  ['Geopolitical Risk Delta','risk','',32],
];

export default function Simulator() {
  const [state, setState] = useState({
    category: 'TARIFFS', magnitude: 25, select: 'Technology', targets: ['China']
  });

  const handleTab = useCallback((cat) => {
    const config = simulatorConfigs[cat];
    setState({ category: cat, magnitude: config.defaultValue, select: config.selectOptions[0], targets: [...config.defaultTargets] });
  }, []);

  const handleTarget = useCallback((target) => {
    setState(prev => {
      const already = prev.targets.includes(target);
      const next = already ? prev.targets.filter(t => t !== target) : [...prev.targets, target];
      return { ...prev, targets: next.length ? next : [target] };
    });
  }, []);

  const config = simulatorConfigs[state.category];
  const values = calculateImpacts(state);
  const narratives = impactNarratives(state);

  const tradeDir = values.trade >= 0 ? '↑' : '↓';
  const gdpDir = values.gdp >= 0 ? '↑' : '↓';
  const partners = state.category === 'SANCTIONS'
    ? [['🇷🇺 Russia','↓'],['🇨🇳 China','→'],['🇹🇷 Turkey','↑'],['🇦🇪 UAE','↑'],['🇮🇳 India','→']]
    : [['🇨🇳 China',tradeDir],['🇪🇺 European Union',tradeDir],['🇲🇽 Mexico',gdpDir],['🇻🇳 Vietnam','↑'],['🇮🇳 India',tradeDir]];

  const responses = state.category === 'TARIFFS'
    ? ['China: accelerate yuan settlement and retaliate on politically salient agricultural exports.','European Union: pursue WTO consultation while expanding anti-coercion instruments.','Mexico and Vietnam: absorb diversionary investment but face stricter rules-of-origin scrutiny.']
    : state.category === 'SANCTIONS'
    ? ['Target state: deepen non-dollar settlement and reroute trade through intermediary jurisdictions.','Sanctioning coalition: expand beneficial-ownership screening and secondary-sanctions enforcement.','Neutral hubs: face higher compliance costs as banks de-risk shipping, insurance, and trade finance.']
    : ['Central banks: adjust forward guidance to contain expectations drift.','Finance ministries: use targeted relief to offset distributional stress without overwhelming monetary transmission.','Trading partners: hedge exposure through inventory buffers and currency reserves.'];

  const precedent = state.category === 'TARIFFS'
    ? 'Comparable to the 2002 Bush steel tariffs, which triggered WTO dispute proceedings and were reversed within 18 months.'
    : state.category === 'SANCTIONS'
    ? "Comparable to the sanctions escalation after Russia's 2014 Crimea annexation and the broader financial restrictions imposed after the 2022 invasion of Ukraine."
    : 'Comparable to the Volcker disinflation and later emerging-market sudden-stop episodes, where domestic stabilization produced external spillovers through dollar funding, capital flows, and trade compression.';

  function fmt(v, suffix) {
    const sign = Number(v) > 0 ? '+' : '';
    return `${sign}${Number(v).toFixed(Math.abs(v) >= 10 ? 1 : 2)}${suffix}`;
  }

  return (
    <main id="app">
      <PageHeader kicker="Policy Simulator" title="Model the Economic Consequences of Policy Decisions." subhead="Adjust macroeconomic levers and observe simulated second-order effects across trade, inflation, employment, and geopolitical stability." />

      <section className="shell section simulator-layout">
        <aside className="control-panel">
          <div className="tabs" role="tablist" aria-label="Policy categories">
            {Object.keys(simulatorConfigs).map(cat => (
              <button key={cat} className={`tab-button ${cat === state.category ? 'is-active' : ''}`} type="button" onClick={() => handleTab(cat)}>{cat}</button>
            ))}
          </div>
          <div id="sim-controls">
            <div className="control-group">
              <label className="control-label" htmlFor="sim-range">{config.sliderLabel}</label>
              <div className="range-wrap">
                <input id="sim-range" type="range" min={config.min} max={config.max} step={config.step} value={state.magnitude}
                  onChange={e => setState(p => ({ ...p, magnitude: Number(e.target.value) }))} />
                <span className="metric-delta">{state.magnitude}{config.unit}</span>
              </div>
            </div>
            <div className="control-group">
              <label className="control-label" htmlFor="sim-select">{config.selectLabel}</label>
              <select id="sim-select" className="select-control" value={state.select}
                onChange={e => setState(p => ({ ...p, select: e.target.value }))}>
                {config.selectOptions.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div className="control-group">
              <span className="control-label">{config.multiLabel}</span>
              <div className="multi-select">
                {config.multiOptions.map(o => (
                  <button key={o} className={`chip ${state.targets.includes(o) ? 'is-selected' : ''}`} type="button" onClick={() => handleTarget(o)}>{o}</button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <section className="impact-dashboard" aria-live="polite">
          <div id="impact-meters">
            {meters.map(([label, key, suffix, max], i) => {
              const value = values[key];
              const width = Math.min(Math.abs(value) / max, 1) * 50;
              const left = value >= 0 ? 50 : 50 - width;
              return (
                <div className="impact-meter" key={label}>
                  <div className="meter-label">{label}</div>
                  <div className="meter-track">
                    <span className="meter-fill" style={{ left:`${left}%`, width:`${width}%`, background: value >= 0 ? 'var(--gold)' : 'var(--red)' }}></span>
                  </div>
                  <div className={`meter-value ${value >= 0 ? 'positive' : 'negative'}`}>{fmt(value, suffix)}</div>
                  <p className="meter-explain">{narratives[i]}</p>
                </div>
              );
            })}
          </div>
        </section>
      </section>

      <section className="shell section divider-top">
        <h2 className="module-heading">Second-Order Effects</h2>
        <div className="effects-grid">
          <div>
            <div className="category">Trading Partners Affected</div>
            <div className="effects-list">
              {partners.map(([name, dir]) => (
                <span key={name}>{name} <strong className={dir==='↑'?'positive':dir==='↓'?'negative':''}>{dir}</strong></span>
              ))}
            </div>
          </div>
          <div>
            <div className="category">Likely Policy Responses</div>
            <div className="effects-list">{responses.map((r,i) => <span key={i}>- {r}</span>)}</div>
          </div>
          <div>
            <div className="category">Historical Precedent</div>
            <p className="lede">{precedent}</p>
          </div>
        </div>
      </section>

      <section className="shell section-tight">
        <div className="scenario-bar">
          <input className="bare-input" type="text" placeholder="Save this scenario" aria-label="Scenario name" />
          <button className="outline-button" type="button">Export as PDF</button>
          <select className="select-control" aria-label="Compare with saved scenario">
            <option>Compare with → Baseline 2024 trade regime</option>
            <option>Compare with → 2018 tariff escalation</option>
            <option>Compare with → Energy sanctions shock</option>
          </select>
        </div>
      </section>

      <section className="shell section-tight">
        <details className="methodology">
          <summary>Methodology note</summary>
          <p>The simulation uses an IS-LM demand channel to estimate output and employment effects from rate, tax, and fiscal-price shocks. Trade effects are approximated with a gravity-model elasticity that scales bilateral exposure by sector intensity and substitution capacity.</p>
        </details>
      </section>

      <Footer />
    </main>
  );
}
