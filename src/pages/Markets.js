import React from 'react';
import { PageHeader, Footer, Spark, signedClass, formatSigned, polylineFrom } from '../components/shared';

function YieldCurveChart() {
  const labels = ['1M','3M','6M','1Y','2Y','5Y','10Y','20Y','30Y'];
  const current = [5.48,5.45,5.31,5.07,4.74,4.36,4.28,4.55,4.42];
  const prior = [5.16,5.25,5.28,5.04,4.35,3.82,3.76,4.01,3.93];
  const xFor = i => 54 + i * (670 / (labels.length - 1));
  return (
    <svg className="yield-chart" viewBox="0 0 780 330" role="img" aria-label="US Treasury yield curve">
      <text x="54" y="18" className="chart-label">US TREASURY YIELD CURVE</text>
      {[270,210,150,90].map(y => <line key={y} x1="54" y1={y} x2="724" y2={y} className="chart-grid" />)}
      <rect x={xFor(4)-12} y="72" width={xFor(6)-xFor(4)+24} height="172" fill="#7C4A4A" opacity="0.16" />
      <text x={xFor(4)+12} y="92" className="chart-axis">2Y/10Y inversion zone</text>
      <polyline className="chart-line-prior" points={polylineFrom(prior,780,330,3.4,5.6)} />
      <polyline className="chart-line" points={polylineFrom(current,780,330,3.4,5.6)} />
      {labels.map((l,i) => <text key={l} x={xFor(i)-8} y="302" className="chart-axis">{l}</text>)}
      <text x="12" y="274" className="chart-axis">3.5</text>
      <text x="12" y="214" className="chart-axis">4.1</text>
      <text x="12" y="154" className="chart-axis">4.7</text>
      <text x="12" y="94" className="chart-axis">5.3</text>
      <text x="54" y="318" className="chart-axis">Gold: current curve. Muted line: curve from 12 months prior.</text>
    </svg>
  );
}

function WtiChart() {
  const prices = [72,75,81,86,83,78,74,71,76,79,82,78];
  const months = ['Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May'];
  return (
    <svg className="area-chart" viewBox="0 0 760 340" role="img" aria-label="WTI crude 12 month price line">
      <text x="54" y="18" className="chart-label">WTI CRUDE 12-MONTH PRICE</text>
      {[282,222,162,102].map(y => <line key={y} x1="54" y1={y} x2="718" y2={y} className="chart-grid" />)}
      <polyline className="chart-line" points={polylineFrom(prices,760,340,68,90)} />
      {months.map((m,i) => <text key={m} x={54+i*(664/11)-8} y="314" className="chart-axis">{m}</text>)}
      <text x="14" y="286" className="chart-axis">$68</text>
      <text x="14" y="226" className="chart-axis">$75</text>
      <text x="14" y="166" className="chart-axis">$82</text>
      <text x="14" y="106" className="chart-axis">$89</text>
    </svg>
  );
}

const command = [
  ['GDP Growth (G7 avg)','1.6%','+0.2 pp','Resilient services consumption is offsetting manufacturing weakness, keeping recession risk uneven rather than synchronized.'],
  ['Global Inflation Rate','4.7%','-0.6 pp','Goods disinflation is doing the visible work, while shelter and wage-sensitive services keep central banks cautious.'],
  ['Fed Funds Rate','5.25-5.50%','unchanged','Policy remains restrictive because the FOMC is prioritizing inflation credibility over near-term credit relief.'],
  ['US 10Y Yield','4.28%','-6 bps','Treasury duration demand improves when investors price slower nominal growth and lower term-premium shock risk.'],
  ['DXY','104.7','-0.18%','Dollar strength reflects rate differentials and safe-asset demand rather than a clean US growth premium.'],
  ['Global PMI Composite','50.6','+0.4','The global economy is expanding at stall speed, with services masking weak tradable-goods momentum.'],
];

const movers = {
  Equities: [
    ['S&P 500','5,321.4',0.42,[7,10,8,13,12,16,14,18]],
    ['NASDAQ 100','18,550',0.64,[8,9,11,15,12,17,16,19]],
    ['STOXX 600','521.3',-0.21,[15,13,14,12,10,11,8,7]],
    ['Nikkei 225','38,920',0.18,[9,11,10,12,15,13,16,17]],
    ['Hang Seng','18,330',-0.76,[18,16,14,15,12,9,10,7]],
    ['MSCI EM','1,057',0.09,[8,7,10,9,13,12,14,15]],
  ],
  Commodities: [
    ['WTI Crude','$78.40',1.26,[8,6,9,10,13,12,16,17]],
    ['Brent','$82.71',0.94,[9,8,11,12,15,13,16,18]],
    ['Gold','$2,345',0.31,[10,12,11,14,15,13,17,19]],
    ['Copper','$4.62/lb',-0.47,[17,16,14,12,13,10,9,8]],
    ['TTF Gas','EUR 31.8',2.12,[6,8,7,10,12,15,14,18]],
    ['CBOT Wheat','$6.72',-0.33,[16,14,15,12,11,9,10,8]],
  ],
  Currencies: [
    ['EUR/USD','1.084',0.12,[9,8,10,11,9,12,14,15]],
    ['USD/JPY','156.8',-0.22,[18,16,15,14,13,10,9,8]],
    ['GBP/USD','1.273',0.08,[9,9,11,10,12,13,14,15]],
    ['USD/CNH','7.24',0.16,[8,10,9,11,13,12,14,16]],
    ['USD/MXN','16.75',-0.41,[17,15,14,12,11,9,8,7]],
    ['USD/TRY','32.2',0.58,[6,7,8,10,12,14,15,18]],
  ],
};

const regions = [
  ['North America','2.2%','3.3%','5.50%','-2.8%',2],
  ['Europe','0.8%','2.6%','4.00%','+2.1%',3],
  ['Asia-Pacific','4.1%','2.4%','varied','+1.7%',3],
  ['Middle East & Africa','3.0%','9.8%','varied','+0.9%',4],
  ['Latin America','2.0%','5.4%','9.25%','-1.6%',3],
];

const emCurrencies = [
  ['Chinese yuan','7.24','-1.9%','Active','Managed fixing and state-bank dollar supply are limiting depreciation without forcing a sharp reserve drawdown.'],
  ['Indian rupee','83.3','-0.7%','Active','Reserve Bank smoothing is preserving import-price stability while capital inflows cushion current-account pressure.'],
  ['Brazilian real','5.15','-6.1%','Passive','Fiscal uncertainty and carry compression have outweighed still-positive real rates.'],
  ['Mexican peso','16.75','+1.8%','None','Nearshoring inflows and high real yields continue to support peso resilience.'],
  ['Turkish lira','32.2','-8.4%','Active','Orthodox rate hikes slowed the adjustment, but inflation inertia keeps depreciation pressure alive.'],
  ['South African rand','18.4','-0.9%','Passive','Commodity sensitivity and power-sector constraints keep the risk premium elevated.'],
  ['Indonesian rupiah','16,040','-4.2%','Active','Dollar strength and portfolio outflows have forced rate defense despite stable domestic demand.'],
  ['Egyptian pound','47.6','-35.0%','Active','A step devaluation and external financing package reset the currency regime but left imported inflation exposed.'],
];

export default function Markets() {
  return (
    <main id="app">
      <PageHeader kicker="Markets & Economic Intelligence" title="The Global Economy in Real Time." subhead="Macro indicators, commodity flows, and currency dynamics — contextualized." />

      <section className="shell section">
        <div className="command-strip">
          {command.map(([label,value,delta,note]) => (
            <div className="metric-tile" key={label}>
              <div className="metric-label">{label}</div>
              <div className="metric-value">{value}</div>
              <div className="metric-delta">{delta}</div>
              <div className="intelligence-note">{note}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="shell section-tight">
        <div className="market-movers">
          {Object.entries(movers).map(([group,rows]) => (
            <div className="mover-column" key={group}>
              <div className="category">{group}</div>
              {rows.map(([name,value,change,points]) => (
                <div className="mover-row" key={name}>
                  <strong>{name}</strong>
                  <span>{value}</span>
                  <span className={signedClass(change)}>{formatSigned(change,'%')}</span>
                  <Spark points={points} colorClass={signedClass(change)} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="shell section">
        <h2 className="module-heading">Yield Curve Visualizer</h2>
        <YieldCurveChart />
        <p className="callout">An inverted 2Y/10Y spread has preceded every US recession since 1955.</p>
      </section>

      <section className="shell section divider-top">
        <h2 className="module-heading">Regional Economic Heat Map</h2>
        <table className="data-table">
          <thead><tr><th>REGION</th><th>GDP GROWTH</th><th>INFLATION</th><th>CENTRAL BANK RATE</th><th>CURRENT ACCOUNT</th><th>POLITICAL RISK</th></tr></thead>
          <tbody>
            {regions.map(([region,gdp,inflation,rate,account,risk]) => (
              <tr key={region}>
                <td><strong>{region}</strong></td>
                <td>{gdp}</td><td>{inflation}</td><td>{rate}</td><td>{account}</td>
                <td><span className="gold-dots">{'●'.repeat(risk)}{'○'.repeat(5-risk)}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="shell section split-60-40 divider-top">
        <div>
          <h2 className="module-heading">Commodities Intelligence: WTI Crude</h2>
          <WtiChart />
        </div>
        <div className="annotation-stack">
          {[
            ['Gold','Central-bank demand and sanctions-risk hedging have turned bullion into a reserve optionality instrument. Higher real rates cap speculative upside, but official-sector buying has made drawdowns shallower.'],
            ['Natural Gas','European inventories are healthy, yet LNG cargo competition remains sensitive to Asian weather and Red Sea routing risk. The market is pricing logistics uncertainty more than immediate scarcity.'],
            ['Wheat','Black Sea export resilience has lowered crisis premia, but weather volatility and insurance costs still make food inflation vulnerable to conflict escalation. Import-dependent states remain exposed through fiscal subsidy channels.'],
          ].map(([title,text]) => (
            <article className="annotation-card" key={title}><h3>{title}</h3><p>{text}</p></article>
          ))}
        </div>
      </section>

      <section className="shell section divider-top">
        <h2 className="module-heading">Currency War Tracker</h2>
        <table className="data-table">
          <thead><tr><th>CURRENCY</th><th>RATE VS USD</th><th>YTD CHANGE</th><th>INTERVENTION</th><th>MACRO NOTE</th></tr></thead>
          <tbody>
            {emCurrencies.map(([currency,rate,ytd,status,note]) => (
              <tr key={currency}>
                <td><strong>{currency}</strong></td>
                <td>{rate}</td><td>{ytd}</td><td>{status}</td><td>{note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <Footer />
    </main>
  );
}
