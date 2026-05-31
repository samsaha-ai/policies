import React from 'react';
import { Spark, signedClass, formatSigned, SmallWorldMap, DebtChart, Footer } from '../components/shared';

const pulse = [
  ['S&P 500', '5,321.4', 0.42, [7, 10, 8, 13, 12, 16, 14, 18]],
  ['DXY Index', '104.68', -0.18, [16, 13, 14, 11, 10, 9, 8, 7]],
  ['WTI Crude', '$78.40', 1.26, [8, 6, 9, 10, 13, 12, 16, 17]],
  ['Brent', '$82.71', 0.94, [9, 8, 11, 12, 15, 13, 16, 18]],
  ['Gold', '$2,345', 0.31, [10, 12, 11, 14, 15, 13, 17, 19]],
  ['US 10Y Yield', '4.28%', -0.06, [18, 17, 14, 15, 12, 11, 9, 8]],
  ['EUR/USD', '1.084', 0.12, [9, 8, 10, 11, 9, 12, 14, 15]],
  ['BTC/USD', '$67,450', -1.74, [18, 16, 17, 13, 14, 10, 11, 8]],
];

const articles = [
  ['SANCTIONS', 'Sanctions Architecture After SWIFT: How Secondary Sanctions Are Reshaping Global Trade Corridors.', 'Financial exclusion is giving way to a denser compliance regime that pushes trade through informal clearing, local-currency settlement, and politically aligned intermediaries.', '18 min ago'],
  ['MONETARY POLICY', "The ECB's Slow Pivot and the Political Economy of Disinflation.", 'Rate relief is arriving after real incomes absorbed the shock, leaving fiscal ministries to manage the lagged distributional effects.', '42 min ago'],
  ['CONFLICT ECONOMY', 'The Red Sea Shock Is Becoming a Working-Capital Problem.', 'Longer shipping routes are tying up inventory finance and raising the cost of resilience for firms with thin supplier redundancy.', '1 hr ago'],
  ['TRADE LAW', 'Export Controls Are Becoming Industrial Policy by Other Means.', 'Technology denial regimes now shape capital expenditure decisions as directly as tariffs once shaped customs flows.', '2 hrs ago'],
  ['SOVEREIGN DEBT', 'Debt Distress Is Moving from Default Events to Negotiation Fatigue.', 'The new sovereign architecture punishes delay with underinvestment long before a formal restructuring is reached.', '3 hrs ago'],
  ['CENTRAL BANKING', 'Reserve Managers Are Buying Optionality, Not Just Gold.', 'The shift into bullion and non-dollar assets is less a revolt against the dollar than a hedge against payment-system weaponization.', '4 hrs ago'],
];

export default function Home() {
  return (
    <main id="app" className="page-home-body">
      <section className="shell lead-band section divider-bottom">
        <div className="grid-12">
          <article className="lead-primary">
            <div className="category">MONETARY ORDER</div>
            <h1 className="lead-title">The Renminbi's Quiet Ascent: What a Multipolar Reserve Currency System Means for Dollar Dominance</h1>
            <p className="lead-thesis">China is not replacing the dollar so much as building a parallel settlement layer for states that need geopolitical insurance. The result is a slower, more fragmented reserve system in which liquidity, sanctions exposure, and strategic autonomy are priced together.</p>
            <div className="story-meta"><span>Elena Markovic</span><span>9 min read</span></div>
          </article>
          <div className="lead-secondary">
            <article className="secondary-story">
              <div className="category">GEOPOLITICAL FINANCE</div>
              <h2 className="secondary-title">Sanctions Architecture After SWIFT: How Secondary Sanctions Are Reshaping Global Trade Corridors.</h2>
              <p className="story-lede">The enforcement frontier has moved from payment messaging into insurance, shipping, beneficial ownership, and correspondent banking risk.</p>
            </article>
            <article className="secondary-story">
              <div className="category">SOVEREIGN RISK</div>
              <h2 className="secondary-title">Debt Distress and Development Finance After the Beijing Lending Cycle.</h2>
              <p className="story-lede">The most consequential negotiations are now happening before default, inside maturity extensions and collateral carveouts.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="shell section-tight">
        <div className="pulse-bar" aria-label="Global pulse market indicators">
          {pulse.map(([label, value, delta, points]) => (
            <div className="pulse-item" key={label}>
              <div className="pulse-label">{label}</div>
              <div className="pulse-value">
                <strong>{value}</strong>
                <span className={signedClass(delta)}>{formatSigned(delta, '%')}</span>
              </div>
              <Spark points={points} colorClass={signedClass(delta)} />
            </div>
          ))}
        </div>
      </section>

      <section className="shell section">
        <div className="intelligence-grid">
          {articles.map(([cat, title, lede, time]) => (
            <article className="article-tile" key={title}>
              <div className="category">{cat}</div>
              <h2 className="article-title">{title}</h2>
              <p className="lede">{lede}</p>
              <div className="timestamp">{time}</div>
            </article>
          ))}
        </div>
      </section>

      <section className="band">
        <div className="band-inner analysis-spread">
          <blockquote className="pull-quote">"The new macro cycle is not defined by scarcity alone, but by who can absorb the cost of strategic redundancy."</blockquote>
          <div>
            <h2 className="abstract-title">Featured Analysis: Strategic Redundancy as the New Cost of Capital</h2>
            <p className="abstract-text">Supply chains are being redesigned around political optionality, not pure efficiency. The resulting capital cycle favors firms and states that can finance duplicate capacity, inventory buffers, and jurisdictional flexibility without losing pricing power.</p>
            <div className="key-findings">
              <div className="finding"><strong>Key Finding 1</strong> — Firms with dual sourcing in critical minerals face higher short-run costs but lower exposure to export-control shocks.</div>
              <div className="finding"><strong>Key Finding 2</strong> — Public credit guarantees are becoming a substitute for missing private insurance in contested trade corridors.</div>
              <div className="finding"><strong>Key Finding 3</strong> — Monetary policy transmission weakens when geopolitical risk forces companies to prioritize resilience over margin expansion.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="shell section data-dispatch">
        <div className="map-frame">
          <h2 className="module-heading">Data Dispatch: Geopolitical Risk Tiers</h2>
          <SmallWorldMap />
        </div>
        <div className="chart-frame">
          <h2 className="module-heading">Public Debt Burden Across Major Economies</h2>
          <DebtChart />
        </div>
      </section>

      <Footer />
    </main>
  );
}
