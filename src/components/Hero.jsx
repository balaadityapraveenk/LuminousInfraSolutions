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
              <h3>3</h3>
              <p>Projects Completed</p>
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
            <div className="hero-image-wrapper">
              <img src="/power_infra_hero.png" alt="Intelligent Power Infrastructure" className="hero-image" />
              <div className="image-glow"></div>
            </div>
            <div className="orbit orbit-1"></div>
            <div className="orbit orbit-2"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
