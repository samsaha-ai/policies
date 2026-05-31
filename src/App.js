import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink, Link } from 'react-router-dom';
import Home from './pages/Home';
import Markets from './pages/Markets';
import Simulator from './pages/Simulator';
import Countries from './pages/Countries';
import Research from './pages/Research';
import RiskMap from './pages/RiskMap';
import Rankings from './pages/Rankings';
import Explainers from './pages/Explainers';

function UtcClock() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const h = String(now.getUTCHours()).padStart(2, '0');
      const m = String(now.getUTCMinutes()).padStart(2, '0');
      const s = String(now.getUTCSeconds()).padStart(2, '0');
      setTime(`UTC ${h}:${m}:${s}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="utc-clock">{time}</span>;
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 4);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header className={`masthead${scrolled ? ' is-scrolled' : ''}`}>
      <Link className="wordmark" to="/">Capital &amp; Diplomacy</Link>
      <nav className="primary-nav" aria-label="Primary">
        <NavLink to="/" end>Intelligence</NavLink>
        <NavLink to="/markets">Markets</NavLink>
        <NavLink to="/simulator">Policy</NavLink>
        <NavLink to="/countries">Countries</NavLink>
        <NavLink to="/research">Research</NavLink>
      </nav>
      <div className="masthead-right">
        <UtcClock />
        <a className="outline-button" href="#subscribe">Subscribe</a>
      </div>
    </header>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/markets" element={<Markets />} />
        <Route path="/simulator" element={<Simulator />} />
        <Route path="/countries" element={<Countries />} />
        <Route path="/research" element={<Research />} />
        <Route path="/risk-map" element={<RiskMap />} />
        <Route path="/rankings" element={<Rankings />} />
        <Route path="/explainers" element={<Explainers />} />
      </Routes>
    </BrowserRouter>
  );
}
