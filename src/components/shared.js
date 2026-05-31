import React from 'react';
import { Link } from 'react-router-dom';

export function formatSigned(value, suffix = '') {
  const sign = Number(value) > 0 ? '+' : '';
  return `${sign}${Number(value).toFixed(Math.abs(value) >= 10 ? 1 : 2)}${suffix}`;
}

export function signedClass(value) {
  return Number(value) >= 0 ? 'delta-up' : 'delta-down';
}

export function Spark({ points, colorClass = '' }) {
  const coords = points.map((p, i) => `${i * 10},${22 - p}`).join(' ');
  return (
    <svg className={`sparkline ${colorClass}`} viewBox="0 0 70 24" aria-hidden="true">
      <polyline points={coords} />
    </svg>
  );
}

export function PageHeader({ kicker, title, subhead, side }) {
  return (
    <section className="shell page-header section-tight">
      <div>
        <div className="page-kicker">{kicker}</div>
        <h1 className="page-title">{title}</h1>
        <p className="page-subhead">{subhead}</p>
      </div>
      {side && <div className="header-side">{side}</div>}
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer" id="subscribe">
      <div className="footer-grid">
        <div>
          <Link className="wordmark" to="/">Capital &amp; Diplomacy</Link>
          <p className="footer-tagline">Geopolitical and economic intelligence for analysts who need context before consensus.</p>
        </div>
        <nav className="footer-links" aria-label="Footer">
          <Link to="/markets">Markets</Link>
          <Link to="/simulator">Policy Simulator</Link>
          <Link to="/countries">Country Intelligence</Link>
          <Link to="/research">Research</Link>
          <Link to="/risk-map">Risk Monitor</Link>
          <Link to="/rankings">Geoeconomic Rankings</Link>
          <Link to="/explainers">Video Explainers</Link>
          <Link to="/">Intelligence Brief</Link>
        </nav>
        <form className="newsletter" onSubmit={e => e.preventDefault()}>
          <label htmlFor="newsletter-email">Join 12,400 analysts</label>
          <input id="newsletter-email" className="bare-input" type="email" placeholder="Email address" aria-label="Email address" />
        </form>
      </div>
    </footer>
  );
}

export function SmallWorldMap() {
  return (
    <>
      <svg className="risk-map-small" viewBox="0 0 960 440" role="img" aria-label="Geopolitical risk tier map">
        <path className="map-land" d="M92 118 L126 84 L183 72 L232 93 L276 122 L304 168 L282 215 L229 224 L205 262 L168 253 L139 214 L104 190 Z" />
        <path className="map-land" d="M268 252 L306 276 L338 331 L326 392 L286 421 L250 376 L232 312 Z" />
        <path className="map-land" d="M406 111 L487 78 L598 78 L711 99 L827 118 L886 161 L835 200 L705 189 L633 226 L532 201 L442 216 L383 173 Z" />
        <path className="map-land" d="M470 223 L526 208 L578 244 L599 310 L566 378 L506 384 L462 330 L438 266 Z" />
        <path className="map-land" d="M728 302 L794 285 L849 319 L842 366 L770 374 Z" />
        <path className="map-highlight" opacity="0.92" d="M602 137 L647 123 L686 138 L690 176 L646 191 L608 171 Z" />
        <path className="map-highlight" opacity="0.74" d="M492 146 L538 124 L619 118 L610 159 L548 176 L499 169 Z" />
        <path className="map-highlight" opacity="0.62" d="M315 135 L355 128 L373 157 L348 185 L307 171 Z" />
        <path className="map-highlight" opacity="0.48" d="M559 201 L581 205 L590 228 L571 244 L551 229 Z" />
        <path className="map-highlight" opacity="0.36" d="M244 304 L277 294 L296 328 L281 368 L252 344 Z" />
        <path className="map-highlight" opacity="0.26" d="M433 245 L471 237 L497 261 L486 299 L446 291 Z" />
        <g className="chart-axis">
          <text x="35" y="410">Tier opacity indicates intensity of geoeconomic risk exposure.</text>
        </g>
      </svg>
      <div className="map-legend">
        <span><i className="legend-dot" style={{ opacity: .92 }}></i>Systemic sanctions risk</span>
        <span><i className="legend-dot" style={{ opacity: .62 }}></i>Supply-chain exposure</span>
        <span><i className="legend-dot" style={{ opacity: .36 }}></i>Sovereign stress</span>
      </div>
    </>
  );
}

export function polylineFrom(values, width = 760, height = 290, min = null, max = null) {
  const lo = min ?? Math.min(...values);
  const hi = max ?? Math.max(...values);
  return values.map((v, i) => {
    const x = 54 + i * ((width - 90) / (values.length - 1));
    const y = 30 + (1 - ((v - lo) / (hi - lo))) * (height - 76);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
}

export function DebtChart() {
  const data = [
    ['Japan', 255], ['Greece', 162], ['Italy', 137], ['United States', 123],
    ['France', 111], ['United Kingdom', 101], ['China', 83], ['Germany', 64]
  ];
  return (
    <svg className="bar-chart" viewBox="0 0 700 370" role="img" aria-label="Public debt to GDP bar chart">
      <text x="0" y="16" className="chart-label">PUBLIC DEBT-TO-GDP</text>
      <line x1="112" y1="334" x2="632" y2="334" className="chart-grid" />
      <text x="112" y="356" className="chart-axis">0</text>
      <text x="295" y="356" className="chart-axis">100</text>
      <text x="488" y="356" className="chart-axis">200</text>
      {data.map(([label, value], i) => {
        const width = (value / 270) * 520;
        const y = 42 + i * 38;
        return (
          <g key={label}>
            <text x="0" y={y + 13} className="chart-axis">{label}</text>
            <rect x="112" y={y} width={width} height="14" fill="#C9A84C" opacity={0.38 + i * 0.055} />
            <text x={124 + width} y={y + 12} className="chart-axis">{value}%</text>
          </g>
        );
      })}
    </svg>
  );
}
