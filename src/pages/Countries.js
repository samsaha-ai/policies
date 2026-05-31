import React, { useState } from 'react';
import { Footer } from '../components/shared';

const countryProfiles = {
  China: {
    official: "People's Republic of China",
    classification: 'STRATEGIC TIER 1 — SYSTEMIC GEOPOLITICAL ACTOR',
    summary: "China is the central manufacturing node in the global economy and the principal strategic competitor to the United States. Its leverage rests on industrial scale, critical mineral processing, trade finance, and the ability to coordinate state credit with long-horizon industrial policy. The near-term risk is a balance-sheet slowdown in property and local government finance that reduces domestic demand while increasing external pressure to export excess capacity.",
    stats: ['1.41B','$17.8T','$12.6K','5.2%','0.2%','83.6%','+1.4%','46.7'],
    risk: 7,
  },
  'United States': {
    official: 'United States of America',
    classification: 'STRATEGIC TIER 1 — RESERVE CURRENCY AND SECURITY ANCHOR',
    summary: 'The United States remains the core issuer of global safe assets and the dominant military alliance organizer. Its leverage is built on dollar liquidity, technology platforms, energy flexibility, and security guarantees. The near-term risk is fiscal polarization that raises term premia and complicates alliance commitments.',
    stats: ['335M','$27.4T','$81.6K','2.5%','3.4%','123%','-3.0%','41.5'],
    risk: 4,
  },
  Russia: {
    official: 'Russian Federation',
    classification: 'STRATEGIC TIER 2 — REVISIONIST ENERGY AND SECURITY ACTOR',
    summary: 'Russia projects influence through energy exports, military coercion, nuclear deterrence, and sanctions adaptation networks. Its leverage is strongest where commodity dependence intersects with weak institutional alignment. The near-term risk is prolonged war expenditure that deepens fiscal rigidity and technological isolation.',
    stats: ['146M','$2.0T','$13.8K','3.6%','7.4%','20%','+2.5%','36.0'],
    risk: 8,
  },
  Germany: {
    official: 'Federal Republic of Germany',
    classification: 'STRATEGIC TIER 2 — INDUSTRIAL AND EUROPEAN POLICY ANCHOR',
    summary: "Germany is the European Union's industrial balance sheet and a key rule-setting actor in trade, climate, and fiscal governance. Its leverage depends on manufacturing depth, export credit, and institutional influence in Brussels. The near-term risk is weak productivity growth combined with energy-cost and China-demand exposure.",
    stats: ['84M','$4.5T','$53.6K','-0.3%','5.9%','64%','+5.9%','31.7'],
    risk: 3,
  },
  India: {
    official: 'Republic of India',
    classification: 'STRATEGIC TIER 2 — DEMOGRAPHIC AND NONALIGNED SCALE POWER',
    summary: 'India is a high-growth market with rising diplomatic optionality between Western security partnerships and Global South leadership. Its leverage rests on demographics, services exports, pharmaceutical capacity, and strategic geography in the Indian Ocean. The near-term risk is employment absorption failing to match the pace of population and urban labor-force growth.',
    stats: ['1.43B','$3.6T','$2.5K','7.6%','5.4%','82%','-1.2%','35.7'],
    risk: 5,
  },
  Brazil: {
    official: 'Federative Republic of Brazil',
    classification: 'STRATEGIC TIER 3 — AGRICULTURAL, ENERGY, AND CLIMATE SWING STATE',
    summary: "Brazil's geopolitical relevance comes from food exports, energy resources, climate governance, and diplomatic reach across the Global South. Its leverage increases when commodity security and decarbonization agendas converge. The near-term risk is fiscal slippage that lifts real rates and crowds out private investment.",
    stats: ['216M','$2.2T','$10.4K','2.9%','4.6%','85%','-1.5%','52.0'],
    risk: 5,
  },
  'Saudi Arabia': {
    official: 'Kingdom of Saudi Arabia',
    classification: 'STRATEGIC TIER 2 — ENERGY PRICE AND REGIONAL SECURITY ACTOR',
    summary: 'Saudi Arabia remains a central actor in oil-market management and Gulf security alignment. Its leverage rests on spare production capacity, sovereign capital, and the ability to coordinate with both Washington and Beijing. The near-term risk is balancing fiscal breakeven oil prices with expensive diversification projects.',
    stats: ['36M','$1.1T','$32.5K','-0.8%','2.3%','24%','+2.0%','45.9'],
    risk: 4,
  },
  Iran: {
    official: 'Islamic Republic of Iran',
    classification: 'STRATEGIC TIER 2 — SANCTIONS-ADAPTED REGIONAL POWER',
    summary: "Iran projects influence through regional networks, energy geography, and asymmetric military capacity. Its leverage is strongest where maritime chokepoints, non-state partners, and sanctions evasion intersect. The near-term risk is escalation that converts proxy conflict into direct infrastructure or shipping disruption.",
    stats: ['89M','$402B','$4.5K','4.7%','40.7%','34%','+3.1%','40.9'],
    risk: 8,
  },
};

const statLabels = ['Population','Nominal GDP','GDP per Capita','GDP Growth','Inflation','Government Debt/GDP','Current Account Balance','Gini Coefficient'];

const dossierTabs = ['ECONOMY','FOREIGN POLICY','DOMESTIC POLITICS','RISK FACTORS'];

function EconomyTab({ country }) {
  if (country !== 'China') return (
    <div className="dossier-grid">
      <div className="dossier-block">
        <h3>Economic Structure</h3>
        <p className="lede">The profile uses a stylized sector mix until the full country brief is published.</p>
        <div className="composition-bar">
          <span className="composition-segment" style={{width:'58%',background:'#C9A84C'}}>Services</span>
          <span className="composition-segment" style={{width:'32%',background:'#8E7A3B'}}>Industry</span>
          <span className="composition-segment" style={{width:'10%',background:'#62562D'}}>Agriculture</span>
        </div>
      </div>
    </div>
  );
  return (
    <div className="dossier-grid">
      <div className="dossier-block">
        <h3>GDP Composition</h3>
        <div className="composition-bar">
          <span className="composition-segment" style={{width:'54.6%',background:'#C9A84C'}}>Services 54.6%</span>
          <span className="composition-segment" style={{width:'38.3%',background:'#8E7A3B'}}>Industry 38.3%</span>
          <span className="composition-segment" style={{width:'7.1%',background:'#62562D'}}>Agriculture 7.1%</span>
        </div>
        <div className="definition-list">
          <span><strong>Top exports:</strong> Electrical machinery $900B; machinery $576B; vehicles $146B; plastics $118B.</span>
          <span><strong>Top partners:</strong> ASEAN, European Union, United States.</span>
          <span><strong>Central bank:</strong> People's Bank of China uses reserve requirements, policy lending facilities, and managed liquidity to stabilize credit conditions.</span>
          <span><strong>Currency regime:</strong> Managed floating exchange rate with daily fixing and capital-account controls.</span>
        </div>
      </div>
      <div className="dossier-block">
        <h3>Intelligence Assessment</h3>
        <p className="lede">China's macro model is transitioning from property-led domestic demand toward manufacturing upgrading and export competitiveness.</p>
      </div>
    </div>
  );
}

function ForeignPolicyTab({ country }) {
  const rows = country === 'China'
    ? [['United States',1],['Russia',4],['European Union',2],['India',1.5],['Saudi Arabia',3.5],['ASEAN',3]]
    : [['United States',3],['China',2.5],['European Union',3],['Russia',2],['India',3],['Regional neighbors',2.5]];
  return (
    <div className="dossier-grid">
      <div>
        <h3 className="module-heading">Alliance Matrix</h3>
        {rows.map(([name,score]) => (
          <div className="spectrum-row" key={name}>
            <span className="muted">{name}</span>
            <span className="spectrum" style={{'--score':score}}></span>
          </div>
        ))}
        <div className="chart-axis">ADVERSARIAL → STRATEGIC PARTNER</div>
      </div>
      <div className="definition-list">
        <span><strong>Memberships:</strong> United Nations Security Council, G20, BRICS, SCO, APEC, WTO.</span>
        <span><strong>Flashpoint:</strong> {country === 'China' ? 'Taiwan remains the highest-consequence dispute because it connects sovereignty claims, semiconductor supply chains, and US alliance credibility.' : 'Key bilateral disputes and multilateral commitments shape external exposure.'}</span>
      </div>
    </div>
  );
}

function DomesticPoliticsTab({ country }) {
  const profile = countryProfiles[country];
  return (
    <div className="dossier-grid">
      <div className="definition-list">
        <span><strong>Government type:</strong> {country === 'China' ? 'One-party socialist republic' : 'Constitutional system with country-specific executive-legislative balance'}</span>
        <span><strong>Ruling party:</strong> {country === 'China' ? 'Chinese Communist Party' : 'Current governing coalition or executive party'}</span>
        <span><strong>Political risk score:</strong> {profile.risk}/10</span>
      </div>
      <p className="lede">{country === 'China'
        ? 'Leadership stability is high because personnel authority and policy signaling remain centralized around the party-state. Institutional quality is strongest in execution capacity and weakest where transparency, legal autonomy, and local fiscal incentives diverge.'
        : 'Leadership stability depends on coalition cohesion, fiscal credibility, and the public\'s tolerance for inflation or austerity. Institutional quality is strongest where the bureaucracy can execute policy without abrupt partisan reversal.'}</p>
    </div>
  );
}

function RiskFactorsTab({ country }) {
  const chinaRisks = [
    ['FISCAL',4,'Local-government financing vehicles remain a latent balance-sheet risk.'],
    ['GEOPOLITICAL',5,'Taiwan and technology controls create the highest external shock channel.'],
    ['SOCIAL',3,'Youth unemployment and weak household confidence complicate the pivot toward consumption-led growth.'],
    ['ENVIRONMENTAL',3,'Water scarcity, flooding, and energy-security tradeoffs affect agriculture, hydroelectric output, and industrial continuity.'],
    ['INSTITUTIONAL',4,'Centralized policy execution can move quickly but may suppress local information flows.'],
  ];
  const genericRisks = [
    ['FISCAL',3,'Debt sustainability depends on growth, real interest rates, and political capacity to protect capital expenditure.'],
    ['GEOPOLITICAL',4,'External alignment choices can alter market access, security guarantees, and exposure to sanctions or export controls.'],
    ['SOCIAL',3,'Real-income pressure can turn inflation, labor-market weakness, or subsidy reform into broader political volatility.'],
    ['ENVIRONMENTAL',3,'Climate and resource-security shocks increasingly transmit through food prices, insurance costs, and infrastructure reliability.'],
    ['INSTITUTIONAL',3,'Policy continuity depends on administrative capacity, judicial predictability, and the credibility of fiscal and monetary authorities.'],
  ];
  const risks = country === 'China' ? chinaRisks : genericRisks;
  return (
    <div className="dossier-grid">
      {risks.map(([cat,dots,text]) => (
        <div className="risk-item" key={cat}>
          <div><span className="category">{cat}</span> <span className="gold-dots">{'●'.repeat(dots)}{'○'.repeat(5-dots)}</span></div>
          <p>{text}</p>
        </div>
      ))}
    </div>
  );
}

function CountryProfile({ country }) {
  const [tab, setTab] = useState('ECONOMY');
  const profile = countryProfiles[country];
  const tabContent = { ECONOMY: <EconomyTab country={country} />, 'FOREIGN POLICY': <ForeignPolicyTab country={country} />, 'DOMESTIC POLITICS': <DomesticPoliticsTab country={country} />, 'RISK FACTORS': <RiskFactorsTab country={country} /> };
  return (
    <>
      <section className="shell section country-header">
        <h1 className="country-title">{country}</h1>
        <div className="official-name">{profile.official}</div>
        <div className="classification">{profile.classification}</div>
        <p className="summary-text">{profile.summary}</p>
      </section>
      <section className="shell section-tight">
        <div className="stats-strip">
          {statLabels.map((label,i) => (
            <div className="stat-item" key={label}>
              <div className="metric-label">{label}</div>
              <div className="stat-value">{profile.stats[i]}</div>
            </div>
          ))}
        </div>
      </section>
      <section className="shell section">
        <div className="tabs">
          {dossierTabs.map(t => (
            <button key={t} className={`tab-button ${t===tab?'is-active':''}`} type="button" onClick={() => setTab(t)}>{t}</button>
          ))}
        </div>
        <div className="dossier-content">{tabContent[tab]}</div>
      </section>
    </>
  );
}

export default function Countries() {
  const [active, setActive] = useState('China');
  const [search, setSearch] = useState('');
  const quick = Object.keys(countryProfiles);

  const handleSearch = e => {
    if (e.key !== 'Enter') return;
    const val = e.target.value.trim().toLowerCase();
    const match = quick.find(c => c.toLowerCase().startsWith(val));
    if (match) { setActive(match); setSearch(''); }
  };

  return (
    <main id="app">
      <section className="shell search-bar section">
        <div className="page-kicker">Country Intelligence</div>
        <input id="country-search" className="bare-input country-search" type="search" placeholder="Search 195 countries..." value={search}
          onChange={e => setSearch(e.target.value)} onKeyDown={handleSearch} aria-label="Search countries" />
        <div className="quick-access">
          {quick.map(c => (
            <button key={c} className={`chip ${c===active?'is-selected':''}`} type="button" onClick={() => setActive(c)}>{c}</button>
          ))}
        </div>
      </section>
      <CountryProfile key={active} country={active} />
      <Footer />
    </main>
  );
}
