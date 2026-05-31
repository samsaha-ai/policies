import React from 'react';
import { PageHeader, Footer } from '../components/shared';

function VideoBox({ number, title, runtime }) {
  return (
    <div className="video-box">
      <span className="episode-number">{number}</span>
      <svg className="play-icon" viewBox="0 0 64 64" aria-hidden="true">
        <circle cx="32" cy="32" r="29" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M27 21 L46 32 L27 43 Z" fill="currentColor" />
      </svg>
      <h3 className="video-title">{title}</h3>
      <span className="runtime">{runtime}</span>
    </div>
  );
}

const latest = [
  ['EP. 014',"Why the Fed's Dual Mandate Creates Impossible Tradeoffs During Supply Shocks",'The Monetary Order','18:42','May 28, 2024'],
  ['EP. 013','How Petrodollar Recycling Shaped the Architecture of Global Finance','The Monetary Order','16:18','May 21, 2024'],
  ['EP. 012','Why Export Controls Are Replacing Tariffs in the Technology War','Trade Wars & Consequences','14:37','May 16, 2024'],
  ['EP. 011','The Political Economy of Food Prices After a Shipping Shock','State & Market','12:54','May 9, 2024'],
  ['EP. 010','How Central Banks Think About Currency Intervention','The Monetary Order','17:05','May 2, 2024'],
  ['EP. 009','What Sovereign Debt Restructuring Actually Negotiates','State & Market','19:11','Apr 25, 2024'],
];

const series = [
  ['The Monetary Order','14 episodes','Money, reserves, central banks, and the institutional architecture behind global liquidity.'],
  ['Trade Wars & Consequences','11 episodes','Tariffs, sanctions, export controls, and the second-order effects of economic coercion.'],
  ['State & Market','9 episodes','How governments, firms, and institutions bargain over risk, inflation, industrial policy, and social stability.'],
];

export default function Explainers() {
  return (
    <main id="app">
      <PageHeader kicker="Intelligence Explainers" title="Complex Economics. Explained Without Condescension." subhead="Short-form video analysis on monetary policy, trade architecture, geopolitical risk, and the economics behind global events." />

      <section className="shell section video-hero">
        <VideoBox number="EP. 014" title="Why the Fed's Dual Mandate Creates Impossible Tradeoffs During Supply Shocks" runtime="18:42" />
        <div>
          <div className="category">The Monetary Order</div>
          <h2 className="report-title">Why the Fed's Dual Mandate Creates Impossible Tradeoffs During Supply Shocks</h2>
          <p className="summary-text">A supply shock makes the central bank fight inflation with a tool designed to reduce demand. The episode explains why employment, credibility, and energy prices can move the policy optimum in different directions at the same time.</p>
          <div className="small-label">Key concepts covered:</div>
          <div className="concept-tags">
            {['Taylor Rule','Output Gap','Supply Shock','Real Rates'].map(tag => (
              <span className="concept-tag" key={tag}>{tag}</span>
            ))}
          </div>
          <div className="story-meta"><span>Hosted by Leila Haddad</span><span>Research desk: Monetary policy</span></div>
        </div>
      </section>

      <section className="shell section divider-top">
        {series.map(([name,count,desc],sIndex) => (
          <div className="series-band" key={name}>
            <div className="series-head"><h2 className="module-heading">{name}</h2><span className="muted">{count}</span></div>
            <p className="lede">{desc}</p>
            <div className="episode-row">
              {latest.slice(0,4).map(([,title,,runtime], index) => (
                <article className="episode-card" key={index}>
                  <VideoBox number={`EP. ${String(14-sIndex*4-index).padStart(3,'0')}`} title={title} runtime={runtime} />
                  <div className="story-meta"><span>{runtime}</span><span className="category">{name}</span></div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="shell section divider-top">
        <h2 className="module-heading">Latest Releases</h2>
        <div className="episode-grid">
          {latest.map(([ep,title,show,runtime,date]) => (
            <article className="episode-card" key={ep}>
              <VideoBox number={ep} title={title} runtime={runtime} />
              <div className="category">{ep}</div>
              <h3>{title}</h3>
              <div className="story-meta"><span>{show}</span><span>{runtime}</span><span>{date}</span></div>
            </article>
          ))}
        </div>
      </section>

      <section className="shell section divider-top">
        <div className="page-kicker">Full Transcripts Available</div>
        <div className="transcript-list section-tight">
          {latest.map(([ep,title]) => (
            <div className="transcript-item" key={ep}>
              <span>{ep} - {title}</span>
              <a className="transcript-link" href="#transcripts">Read transcript →</a>
            </div>
          ))}
        </div>
      </section>

      <section className="shell section">
        <div className="submit-banner">
          <div>
            <h2 className="module-heading">Shape the editorial agenda.</h2>
            <p className="lede">Capital &amp; Diplomacy commissions explainers based on reader-submitted policy questions.</p>
          </div>
          <div className="topic-form">
            <input className="bare-input" type="text" placeholder="Propose a topic" aria-label="Propose a topic" />
            <button className="outline-button" type="button">Propose a topic →</button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
