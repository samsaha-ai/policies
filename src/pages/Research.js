import React, { useState } from 'react';
import { PageHeader, Footer, polylineFrom } from '../components/shared';

const researchPieces = [
  ['ECONOMICS BEHIND THE HEADLINES','Why the Fed\'s Dual Mandate Creates Impossible Tradeoffs During Supply Shocks','Supply shocks force central banks to choose between inflation precision and labor-market damage when rate hikes cannot produce oil, chips, or shipping capacity.','Mara Venkataraman','12 min','May 24, 2024'],
  ['POLICY BRIEFS','Strategic Tariffs and the Return of Industrial Bargaining','Tariffs are increasingly deployed as bargaining infrastructure that links supply-chain relocation to domestic political coalitions.','Owen Leclerc','9 min','May 20, 2024'],
  ['WORKING PAPERS','Reserve Diversification Under Sanctions Risk: Evidence from Gold Accumulation','Central-bank reserve behavior suggests that sanctions exposure raises the option value of non-liability assets even without immediate dollar liquidation.','Nadia Rahman','26 min','May 18, 2024'],
  ['GEOPOLITICAL RISK REPORTS','Maritime Chokepoints and the Insurance Premium on Globalization','Shipping disruptions are best understood as balance-sheet shocks that raise working-capital needs before they appear in consumer prices.','Tomas Iversen','14 min','May 16, 2024'],
  ['COUNTRY ASSESSMENTS','India\'s Manufacturing Ambition and the Limits of Labor Absorption','Industrial policy can lift export capacity, but demographic leverage depends on formal employment creation rather than headline GDP growth.','Anika Bose','18 min','May 12, 2024'],
  ['POLICY BRIEFS','Sovereign Debt Workouts in a Fragmented Creditor System','The rise of bilateral and collateralized lending has made timing, coordination, and comparability of treatment the core debt-relief problems.','Julian Acosta','11 min','May 8, 2024'],
];

const filters = ['ALL','ECONOMICS BEHIND THE HEADLINES','POLICY BRIEFS','WORKING PAPERS','GEOPOLITICAL RISK REPORTS','COUNTRY ASSESSMENTS'];

function ReportChart() {
  const china = [18,32,48,62,74,84,91];
  const multilaterals = [42,44,47,49,52,55,58];
  const privateCreditors = [21,24,27,31,34,37,40];
  const years = ['2012','2014','2016','2018','2020','2022','2024'];
  return (
    <svg className="report-chart" viewBox="0 0 760 380" role="img" aria-label="Comparative creditor exposure chart">
      <text x="54" y="20" className="chart-label">SUB-SAHARAN AFRICA EXTERNAL PUBLIC DEBT EXPOSURE</text>
      {[306,236,166,96].map(y => <line key={y} x1="54" y1={y} x2="716" y2={y} className="chart-grid" />)}
      <polyline className="chart-line" points={polylineFrom(china,760,380,0,100)} />
      <polyline className="chart-line-prior" points={polylineFrom(multilaterals,760,380,0,100)} />
      <polyline points={polylineFrom(privateCreditors,760,380,0,100)} fill="none" stroke="#7C4A4A" strokeWidth="1.7" />
      {years.map((y,i) => <text key={y} x={54+i*(662/6)-10} y="338" className="chart-axis">{y}</text>)}
      <text x="590" y="72" className="chart-axis">China-linked lending</text>
      <text x="590" y="156" className="chart-axis">Multilaterals</text>
      <text x="590" y="226" className="chart-axis">Private creditors</text>
    </svg>
  );
}

export default function Research() {
  const [filter, setFilter] = useState('ALL');

  return (
    <main id="app">
      <PageHeader kicker="Research & Analysis" title="Original Intelligence. Independent Analysis." subhead="Working papers, policy briefs, and deep-dive analysis at the intersection of economics, geopolitics, and international law." />

      <section className="shell section report-layout">
        <div>
          <h2 className="report-title">Debt Distress and Development Finance: How China's Belt and Road Lending Is Reshaping Sovereign Debt Architecture in Sub-Saharan Africa.</h2>
          <p className="report-subtitle">Creditor fragmentation, collateral clauses, and the politics of restructuring delay.</p>
          <p className="report-abstract">This report examines how Chinese policy-bank lending altered the bargaining structure of sovereign debt workouts across Sub-Saharan Africa. It finds that debt distress increasingly emerges through delayed investment, import compression, and fiscal arrears before a formal default event.</p>
          <div className="argument-list">
            <span>— Chinese lending changed the maturity profile and collateral politics of public debt.</span>
            <span>— Debt distress now appears as liquidity rationing before market access is fully lost.</span>
            <span>— The Common Framework remains too slow for countries facing simultaneous climate, food, and currency shocks.</span>
          </div>
          <div className="metadata-row"><span>REPORT</span><span>24 pages</span><span>Published May 29, 2024</span><span className="category">SOVEREIGN DEBT</span></div>
        </div>
        <div><ReportChart /></div>
      </section>

      <section className="shell section-tight divider-top">
        <div className="text-tabs" id="research-tabs">
          {filters.map(f => (
            <button key={f} className={`text-tab ${f===filter?'is-active':''}`} type="button" onClick={() => setFilter(f)}>{f}</button>
          ))}
        </div>
      </section>

      <section className="shell section-tight">
        <div className="research-index">
          {researchPieces.filter(([series]) => filter==='ALL' || series===filter).map(([series,title,abstract,author,read,date]) => (
            <article className="research-item" key={title}>
              <div className="series-label">{series}</div>
              <h2 className="article-title">{title}</h2>
              <p className="lede">{abstract}</p>
              <div className="story-meta"><span>{author}</span><span>{read}</span><span>{date}</span></div>
            </article>
          ))}
        </div>
      </section>

      <section className="band">
        <div className="band-inner">
          <div className="page-kicker">Economics Behind the Headlines</div>
          <div className="issue-strip section-tight">
            {[
              ['EVENT — Fed holds rates at 5.25%. WHY IT MATTERS:','The Taylor Rule now implies a modest overshoot, signaling the FOMC is prioritizing labor-market resilience over inflation precision.'],
              ['EVENT — Red Sea rerouting extends delivery times. WHY IT MATTERS:','Inventory finance becomes the transmission channel as firms carry more goods in transit and pay higher insurance premia.'],
              ['EVENT — China expands support for strategic manufacturing. WHY IT MATTERS:','Industrial credit can sustain export volumes even when household demand is weak, exporting disinflationary pressure abroad.'],
            ].map(([event,answer]) => (
              <article className="issue-teaser" key={event}><div className="category">{event}</div><p>{answer}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="shell section">
        <div className="submit-banner">
          <div>
            <h2 className="module-heading">Contribute original research.</h2>
            <p className="lede">Capital &amp; Diplomacy publishes original analysis from emerging voices in economics, international relations, and public policy.</p>
          </div>
          <a className="outline-button" href="mailto:research@capitaldiplomacy.example">Submit a piece →</a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
