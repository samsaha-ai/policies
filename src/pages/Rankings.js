import React, { useState } from 'react';
import { PageHeader, Footer } from '../components/shared';

const topRanks = [
  [1,'United States',92.4,[94,96,84,88],'The United States combines reserve-currency depth, alliance reach, technology leadership, and energy flexibility in a way no competitor currently matches.'],
  [2,'China',88.1,[92,86,68,82],"China's manufacturing scale and state-directed industrial capacity offset weaker institutional openness and balance-sheet fragility."],
  [3,'Germany',81.3,[78,72,88,76],'Germany remains Europe\'s industrial and regulatory anchor despite weak demographics and energy-transition pressure.'],
  [4,'Japan',79.6,[76,71,86,80],"Japan's capital depth, technology base, and alliance position compensate for debt and demographic constraints."],
  [5,'United Kingdom',76.8,[72,74,84,70],'The United Kingdom retains financial, intelligence, and legal influence beyond its manufacturing weight.'],
  [6,'France',75.9,[70,77,82,71],"France's military capacity, EU influence, and energy system resilience support a higher geopolitical score than its growth profile implies."],
  [7,'India',74.5,[73,70,57,78],"India's demographic scale and strategic geography are rising faster than its institutional and infrastructure capacity."],
  [8,'Canada',72.8,[69,66,87,73],'Canada benefits from resource security, institutional quality, and US-market integration, with limited independent coercive leverage.'],
  [9,'South Korea',71.4,[75,62,82,69],"South Korea's technology and manufacturing depth are strategically significant but exposed to Northeast Asian security risk."],
  [10,'Australia',70.2,[65,67,88,74],"Australia's resource position, alliance role, and institutional resilience give it leverage beyond population scale."],
];

const indexRanks = [
  [11,'Italy','Europe',68.9,66,58,76,62,0.4],[12,'Netherlands','Europe',68.1,64,55,89,66,0.8],
  [13,'Switzerland','Europe',67.4,62,52,94,70,0.2],[14,'Spain','Europe',65.8,61,51,78,63,0.6],
  [15,'Saudi Arabia','Middle East & Africa',64.9,67,70,49,65,1.1],[16,'Brazil','Americas',63.5,64,58,54,60,-0.3],
  [17,'Indonesia','Asia-Pacific',62.7,63,55,52,64,0.7],[18,'Turkey','Middle East & Africa',61.6,58,65,43,58,-0.6],
  [19,'Mexico','Americas',60.8,61,52,50,62,0.9],[20,'Singapore','Asia-Pacific',60.1,56,48,93,67,0.1],
  [21,'United Arab Emirates','Middle East & Africa',59.4,58,61,58,64,1.3],[22,'Russia','Europe',58.7,61,74,31,56,-2.4],
  [23,'Norway','Europe',57.9,54,47,92,71,0.5],[24,'Sweden','Europe',57.2,53,45,91,68,0.3],
  [25,'Poland','Europe',56.6,55,50,67,61,1.0],[26,'Israel','Middle East & Africa',55.8,54,64,64,49,-1.1],
  [27,'Malaysia','Asia-Pacific',54.9,55,45,61,58,0.4],[28,'Thailand','Asia-Pacific',53.6,52,42,57,55,-0.2],
  [29,'Vietnam','Asia-Pacific',52.8,56,43,46,59,1.5],[30,'South Africa','Middle East & Africa',51.7,51,52,55,45,-0.7],
  [31,'Argentina','Americas',50.6,50,44,39,43,-1.8],[32,'Chile','Americas',49.8,46,39,73,52,0.2],
  [33,'Qatar','Middle East & Africa',48.9,49,50,54,59,0.5],[34,'Egypt','Middle East & Africa',47.6,48,55,35,42,-0.9],
  [35,'Philippines','Asia-Pacific',46.7,47,39,48,50,0.6],[36,'Nigeria','Middle East & Africa',45.8,46,45,34,41,-0.5],
  [37,'Colombia','Americas',44.6,43,38,50,45,-0.2],[38,'Bangladesh','Asia-Pacific',43.9,45,34,37,46,0.7],
  [39,'Pakistan','Asia-Pacific',42.7,41,48,30,35,-1.2],[40,'Morocco','Middle East & Africa',41.9,40,36,45,44,0.4],
  [41,'Kenya','Middle East & Africa',40.8,39,35,42,41,0.5],[42,'Peru','Americas',39.7,38,32,47,40,-0.4],
  [43,'Kazakhstan','Asia-Pacific',38.9,40,42,32,39,0.1],[44,'Ukraine','Europe',38.0,33,48,42,29,-2.6],
  [45,'Greece','Europe',37.4,35,31,59,38,0.9],[46,'Hungary','Europe',36.8,36,34,43,36,-0.3],
  [47,'Iran','Middle East & Africa',36.0,38,53,24,30,-1.6],[48,'Algeria','Middle East & Africa',35.2,34,37,30,36,0.2],
  [49,'Ethiopia','Middle East & Africa',34.6,35,31,28,34,0.4],[50,'Sri Lanka','Asia-Pacific',34.1,32,27,36,31,1.0],
];

const colors = ['#C9A84C','#9C6B3E','#7B7F68','#7C4A4A'];

function PillarBar({ scores }) {
  const total = scores.reduce((s,v) => s+v, 0);
  return (
    <div className="pillar-bar">
      {scores.map((s,i) => (
        <span key={i} className="pillar-seg" style={{ width:`${(s/total)*100}%`, background: colors[i] }} />
      ))}
    </div>
  );
}

const sortColumns = { score:3, economic:4, geo:5, institutional:6, resilience:7 };

export default function Rankings() {
  const [sort, setSort] = useState('score');
  const [region, setRegion] = useState('All');

  const filtered = indexRanks
    .filter(r => region === 'All' || r[2] === region)
    .sort((a,b) => b[sortColumns[sort]] - a[sortColumns[sort]]);

  return (
    <main id="app">
      <PageHeader kicker="Geoeconomic Rankings" title="The Capital & Diplomacy Geoeconomic Power Index." subhead="A composite ranking of 50 nations across economic capacity, geopolitical leverage, institutional resilience, and strategic influence — updated annually." />

      <section className="methodology-panel section">
        <div className="pillar-strip">
          {[
            ['ECONOMIC CAPACITY','35%','Measures output scale, productivity, reserve adequacy, financial depth, and the capacity to sustain industrial investment.','GDP; reserve assets; capital-market depth'],
            ['GEOPOLITICAL LEVERAGE','30%','Measures military reach, alliance centrality, sanctions capacity, energy influence, and ability to shape external choices.','Defense reach; alliance network; coercive tools'],
            ['INSTITUTIONAL QUALITY','20%','Measures rule credibility, administrative capacity, policy predictability, and public-sector effectiveness.','Governance; legal predictability; corruption control'],
            ['STRATEGIC RESILIENCE','15%','Measures food, energy, fiscal, demographic, and supply-chain resilience under systemic shocks.','Energy security; fiscal space; supply-chain redundancy'],
          ].map(([name,weight,desc,subs]) => (
            <div className="pillar" key={name}>
              <div className="category">{name}</div>
              <div className="pillar-weight">{weight}</div>
              <p className="lede">{desc}</p>
              <div className="small-label">{subs}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="shell section">
        <div className="top-ranking">
          {topRanks.map(([rank,country,score,pillars,rationale]) => (
            <div className={`rank-entry ${rank<=3?'top-three':''}`} key={rank}>
              <div className="rank-number">{rank}</div>
              <div className="rank-country">{country}</div>
              <div className="rank-score">{score}</div>
              <PillarBar scores={pillars} />
              <p className="lede">{rationale}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="shell section divider-top">
        <div className="explorer">
          <h2 className="module-heading">Full Index: Ranks 11–50</h2>
          <div className="explorer-controls">
            <label className="control-inline">
              <span className="control-label">Sort by:</span>
              <select id="rank-sort" className="select-control" value={sort} onChange={e => setSort(e.target.value)}>
                <option value="score">Overall</option>
                <option value="economic">Economic</option>
                <option value="geo">Geopolitical</option>
                <option value="institutional">Institutional</option>
                <option value="resilience">Resilience</option>
              </select>
            </label>
            <label className="control-inline">
              <span className="control-label">Filter by region:</span>
              <select id="rank-region" className="select-control" value={region} onChange={e => setRegion(e.target.value)}>
                {['All','Americas','Europe','Asia-Pacific','Middle East & Africa'].map(r => <option key={r}>{r}</option>)}
              </select>
            </label>
          </div>
        </div>
        <table className="data-table">
          <thead><tr><th>RANK</th><th>COUNTRY</th><th>GPI SCORE</th><th>ECONOMIC</th><th>GEOPOLITICAL</th><th>INSTITUTIONAL</th><th>RESILIENCE</th><th>YOY CHANGE</th></tr></thead>
          <tbody>
            {filtered.map(([rank,country,rowRegion,score,economic,geo,institutional,resilience,yoy]) => (
              <tr key={rank}>
                <td>{rank}</td>
                <td><strong>{country}</strong><br /><span className="chart-axis">{rowRegion}</span></td>
                <td>{score.toFixed(1)}</td>
                <td>{economic}</td><td>{geo}</td><td>{institutional}</td><td>{resilience}</td>
                <td className={yoy>=0?'delta-up':'delta-down'}>{yoy>=0?'↑':'↓'} {Math.abs(yoy).toFixed(1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="shell section notes-download">
        <div>
          <h2 className="module-heading">Methodology &amp; Data Sources</h2>
          <p className="lede">The index combines macroeconomic, institutional, security, and resilience indicators using normalized scores and pillar weights. Input datasets reference IMF macro series, World Bank development indicators, Freedom House governance measures, and SIPRI military-expenditure data.</p>
        </div>
        <div className="download-links">
          <a className="outline-button" href="#downloads">Download Full Index (CSV)</a>
          <a className="outline-button" href="#downloads">Download Methodology Brief (PDF)</a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
