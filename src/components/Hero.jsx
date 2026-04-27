import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="hero-background">
        <div className="glow-orb orb-1"></div>
        <div className="glow-orb orb-2"></div>
        <div className="grid-overlay"></div>
      </div>
      
      <div className="container hero-container">
        <div className="hero-content animate-fade-in">
          <div className="badge">
            <span className="pulse-dot"></span> Next-Gen Power Solutions
          </div>
          <h1 className="hero-title">
            Empowering the Future With <br/>
            <span className="text-gradient-power">Intelligent Infrastructure</span>
          </h1>
          <p className="hero-description delay-1 animate-fade-in">
            Luminous Power Infra delivers high-voltage, sustainable, and reliable electrical infrastructure solutions for industrial, commercial, and utility-scale projects.
          </p>
          <div className="hero-buttons delay-2 animate-fade-in">
            <a href="#services" className="btn btn-primary">Explore Solutions</a>
            <a href="#contact" className="btn btn-secondary">Contact Us</a>
          </div>
          
          <div className="stats-row delay-3 animate-fade-in">
            <div className="stat-item">
              <h3>500+</h3>
              <p>MW Installed</p>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <h3>99.9%</h3>
              <p>Reliability</p>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <h3>24/7</h3>
              <p>Grid Support</p>
            </div>
          </div>
        </div>
        
        <div className="hero-visual delay-1 animate-fade-in">
          <div className="visual-container">
            <div className="transformer-model">
               {/* Decorative elements representing infrastructure */}
               <div className="t-base"></div>
               <div className="t-body">
                 <div className="t-bars"></div>
                 <div className="t-bars"></div>
                 <div className="t-bars"></div>
               </div>
               <div className="t-tops">
                 <div className="t-insulator"></div>
                 <div className="t-insulator"></div>
                 <div className="t-insulator"></div>
               </div>
               <div className="energy-flow"></div>
            </div>
            <div className="orbit orbit-1"></div>
            <div className="orbit orbit-2"></div>
            <div className="floating-card c1">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
              <span>Smart Grid Ready</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
