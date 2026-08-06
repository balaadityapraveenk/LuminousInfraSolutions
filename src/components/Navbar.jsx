import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ theme, toggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container navbar-container">
        <Link to="/" className="logo">
          <div className="logo-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 2L4.09347 12.6879C3.74466 13.1064 4.04236 13.75 4.58559 13.75H11L10 22L19.9065 11.3121C20.2553 10.8936 19.9576 10.25 19.4144 10.25H13L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="logo-text">Luminous <span className="text-gradient">Power Infra </span>Solutions</span>
        </Link>
        <ul className="nav-links">
          <li>{isHome ? <a href="#home">Home</a> : <Link to="/">Home</Link>}</li>
          <li>{isHome ? <a href="#services">Solutions</a> : <Link to="/#services">Solutions</Link>}</li>
          <li><Link to="/solar" style={{ color: location.pathname === '/solar' ? 'var(--accent-yellow)' : '' }}>Solar</Link></li>
          <li>{isHome ? <a href="#about">About</a> : <Link to="/#about">About</Link>}</li>
          <li>{isHome ? <a href="#projects">Projects</a> : <Link to="/#projects">Projects</Link>}</li>
          <li>{isHome ? <a href="#contact">Contact</a> : <Link to="/#contact">Contact</Link>}</li>
        </ul>
        <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle Theme">
            {theme === 'dark' ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            )}
          </button>
          <Link to="/#contact" className="btn btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.95rem' }}>Get Quote</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
