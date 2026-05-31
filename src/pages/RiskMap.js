import React, { useRef, useState } from 'react';
import { PageHeader, Footer } from '../components/shared';

const riskTierColors = {
  'ACTIVE CONFLICT': '#7C2F2F',
  'HIGH TENSION': '#8E563A',
  'SANCTIONS REGIME': '#9C6B3E',
  'POLITICAL INSTABILITY': '#A88948',
  'CONTESTED TERRITORY': '#C9A84C',
};

const highlighted = [
  ['Russia','SANCTIONS REGIME','Sanctions pressure has reoriented trade toward China, India, Turkey, and Gulf intermediaries. Energy flows continue, but finance, insurance, and technology access carry elevated compliance risk.','M510 112 L580 78 L720 92 L862 126 L884 174 L806 194 L700 177 L612 197 L524 171 Z'],
  ['Ukraine','ACTIVE CONFLICT','The war remains the central European security shock and a continuing drain on fiscal, energy, and defense capacity.','M494 174 L532 168 L552 188 L525 207 L489 198 Z'],
  ['China','HIGH TENSION','Strategic competition is concentrated in semiconductors, maritime claims, and export controls.','M665 202 L707 185 L750 201 L754 246 L718 273 L666 255 L642 224 Z'],
  ['Taiwan','CONTESTED TERRITORY','Taiwan links sovereignty risk with the most advanced semiconductor supply chain in the global economy.','M760 238 L768 250 L764 265 L754 253 Z'],
  ['Iran','SANCTIONS REGIME',"Iran's sanctions-adapted economy remains tied to oil exports, regional networks, and maritime leverage.",'M552 238 L584 227 L611 248 L601 279 L564 282 L541 260 Z'],
  ['Israel and Palestinian Territories','ACTIVE CONFLICT','The conflict has produced regional escalation risk across energy, shipping, and alliance politics.','M526 250 L536 249 L542 272 L531 284 L520 269 Z'],
  ['Yemen','ACTIVE CONFLICT','The conflict and Red Sea attacks have turned a local war into a global shipping-risk variable.','M546 307 L579 304 L594 322 L568 340 L538 330 Z'],
  ['Sudan','ACTIVE CONFLICT','Civil war has disrupted state capacity, food security, and regional migration flows.','M506 287 L544 283 L562 321 L540 362 L498 341 L486 309 Z'],
  ['Myanmar','POLITICAL INSTABILITY','Civil conflict and military rule have fragmented territorial control and trade governance.','M690 276 L714 264 L728 301 L711 338 L684 323 Z'],
  ['North Korea','HIGH TENSION','Missile development and sanctions evasion keep Northeast Asian security risk structurally elevated.','M733 182 L751 180 L762 193 L747 207 L729 199 Z'],
  ['Syria','SANCTIONS REGIME','The conflict is frozen rather than resolved, leaving reconstruction, sanctions relief, and refugee return politically blocked.','M516 239 L539 236 L551 248 L535 260 L512 253 Z'],
  ['Venezuela','SANCTIONS REGIME','Energy sanctions, debt distress, and migration pressure shape Venezuela\'s regional impact.','M283 310 L317 305 L338 326 L324 354 L285 348 L267 327 Z'],
  ['Sahel','POLITICAL INSTABILITY','Military coups, insurgency, and foreign-security realignment have weakened regional coordination.','M444 284 L493 277 L515 303 L500 333 L450 330 L421 305 Z'],
  ['South China Sea','CONTESTED TERRITORY','Competing maritime claims create a persistent low-intensity risk to trade routes and naval signaling.','M705 278 L780 275 L800 320 L735 337 Z'],
];

const conflicts = [
  ['Russia-Ukraine War','Eastern Europe','2014','Russia; Ukraine; NATO-backed Ukrainian defense support','ENERGY','↑'],
  ['Israel-Hamas War','Levant','2023','Israel; Hamas; regional proxy actors','SHIPPING','↑'],
  ['Sudan Civil War','Northeast Africa','2023','Sudanese Armed Forces; Rapid Support Forces','FOOD','↑'],
  ['Yemen Conflict','Arabian Peninsula','2014','Houthi movement; Yemeni government; regional coalition actors','SHIPPING','→'],
  ['Syrian Civil War','Levant','2011','Syrian government; opposition factions; external backers','FINANCE','→'],
  ['Myanmar Civil War','Southeast Asia','2021','Military junta; ethnic armed organizations; resistance forces','ENERGY','↑'],
  ['Sahel Insurgency','West Africa','2012','Jihadist groups; national militaries; regional forces','FOOD','↑'],
  ['Red Sea Shipping Crisis','Red Sea','2023','Houthi movement; US-led maritime coalition; commercial shipping','SHIPPING','↑'],
];

const sanctions = [
  ['Russia','US / EU / UK / G7','2014 / 2022','Finance, energy, technology',5],
  ['Iran','US / EU / UN','1979 / 2006','Energy, banking, defense',5],
  ['North Korea','UN / US / EU','2006','Defense, finance, shipping',5],
  ['Myanmar','US / EU / UK','2021','Military-linked entities',4],
  ['Syria','US / EU','2011','Finance, energy, reconstruction',4],
  ['Belarus','EU / US / UK','2020 / 2022','Finance, potash, aviation',4],
];

const scores = [
  ['Global GPR Index','71.4','Composite text-mined geopolitical risk series normalized against long-run conflict volatility.'],
  ['Great Power Tension Score','82.0','Weighted assessment of US-China, NATO-Russia, and regional deterrence pressure.'],
  ['Nuclear Risk Indicator','64.8','Tracks doctrine signaling, missile testing, and crisis proximity among nuclear-armed states.'],
  ['Trade War Intensity','58.6','Measures tariff coverage, export controls, sanctions spillover, and retaliatory policy activity.'],
  ['Alliance Fragmentation Index','47.9','Captures voting divergence, defense spending gaps, and coalition durability under stress.'],
];

function WorldRiskMap() {
  const [tooltip, setTooltip] = useState(null);
  const wrapRef = useRef(null);

  const handleMouseMove = e => {
    const el = e.target.closest('.risk-country');
    if (!el) { setTooltip(null); return; }
    const rect = wrapRef.current.getBoundingClientRect();
    setTooltip({
      x: Math.min(e.clientX - rect.left + 16, rect.width - 280),
      y: Math.max(e.clientY - rect.top - 20, 12),
      name: el.dataset.name, tier: el.dataset.tier, note: el.dataset.note,
    });
  };

  return (
    <div className="world-risk-wrap" ref={wrapRef} onMouseMove={handleMouseMove} onMouseLeave={() => setTooltip(null)}>
      <svg className="world-risk-map" viewBox="0 0 1000 560" role="img" aria-label="Global geopolitical risk map">
        <path className="map-land" d="M72 132 L125 88 L205 78 L282 112 L327 170 L304 235 L248 251 L219 309 L170 296 L130 245 L84 218 Z" />
        <path className="map-land" d="M280 298 L326 326 L361 395 L346 481 L295 520 L255 461 L237 374 Z" />
        <path className="map-land" d="M386 119 L479 78 L618 75 L763 95 L904 135 L954 192 L884 235 L747 217 L657 264 L542 238 L442 250 L371 197 Z" />
        <path className="map-land" d="M455 257 L523 245 L590 291 L610 374 L573 472 L505 482 L452 413 L425 326 Z" />
        <path className="map-land" d="M748 363 L826 344 L892 384 L882 446 L794 454 Z" />
        <path className="map-land" d="M438 105 L458 91 L489 98 L497 122 L468 135 L441 125 Z" />
        {highlighted.map(([name,tier,note,d]) => (
          <path key={name} className="risk-country" data-name={name} data-tier={tier} data-note={note}
            style={{ fill: riskTierColors[tier] }} d={d} />
        ))}
      </svg>
      {tooltip && (
        <div className="map-tooltip is-visible" style={{ left: tooltip.x, top: tooltip.y }}>
          <div className="tooltip-title">{tooltip.name}</div>
          <div className="tooltip-tier">{tooltip.tier}</div>
          <div className="tooltip-note">{tooltip.note}</div>
        </div>
      )}
    </div>
  );
}

export default function RiskMap() {
  const side = (
    <>
      <span>Last updated: May 29, 2024 - 14:00 UTC</span>
      <span className="risk-badge">Risk Index: ELEVATED</span>
    </>
  );

  return (
    <main id="app">
      <PageHeader kicker="Geopolitical Risk Monitor" title="Global Conflict & Instability Tracker." subhead="Active conflicts, sanctions architectures, contested territories, and systemic geopolitical risks — updated and analyzed." side={side} />

      <section className="shell section-tight">
        <div className="legend-bar">
          {Object.entries(riskTierColors).map(([tier, color]) => (
            <span className="legend-item" key={tier}><i className="legend-swatch" style={{ background: color }}></i>{tier}</span>
          ))}
        </div>
      </section>

      <section className="shell section-tight"><WorldRiskMap /></section>

      <section className="shell section risk-layout divider-top">
        <div>
          <h2 className="module-heading">Active Conflicts</h2>
          <table className="data-table">
            <thead><tr><th>CONFLICT</th><th>REGION</th><th>START DATE</th><th>PARTIES INVOLVED</th><th>ECONOMIC IMPACT</th><th>RISK TRAJECTORY</th></tr></thead>
            <tbody>
              {conflicts.map(([conflict,region,start,parties,impact,trajectory]) => (
                <tr key={conflict}>
                  <td><strong>{conflict}</strong></td>
                  <td>{region}</td><td>{start}</td><td>{parties}</td><td>{impact}</td>
                  <td className={trajectory==='↑'?'negative':trajectory==='↓'?'delta-up':''}>{trajectory}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <aside className="sanctions-panel">
          <div className="category">Active Sanctions Regimes</div>
          {sanctions.map(([country,body,year,sector,dots]) => (
            <div className="sanction-item" key={country}>
              <strong>{country}</strong><br />{body} - {year}<br />{sector}<br />
              <span className="gold-dots">{'●'.repeat(dots)}{'○'.repeat(5-dots)}</span>
            </div>
          ))}
        </aside>
      </section>

      <section className="band">
        <div className="band-inner score-strip">
          {scores.map(([name,score,note]) => (
            <div className="score-item" key={name}>
              <div className="metric-label">{name}</div>
              <div className="score-value">{score}</div>
              <p className="intelligence-note">{note}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
