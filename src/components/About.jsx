import React from 'react';
import './About.css';

const About = () => {
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about-grid">
          <div className="about-visual">
            <div className="image-wrapper">
              <div className="overlay-gradient"></div>
              <img src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&q=80" alt="Advanced Power Substation" />
            </div>
            <div className="experience-badge">
              <span className="years">25+</span>
              <span className="text">Years of<br/>Excellence</span>
            </div>
            <div className="decorative-lines">
              <span></span><span></span><span></span>
            </div>
          </div>
          
          <div className="about-content">
            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
              Pioneering the <span className="text-gradient">Energy Transition</span>
            </h2>
            <p className="lead-text">
              We don't just build power infrastructure; we engineer the backbone of modern society with unyielding precision and innovation.
            </p>
            <p className="body-text">
              Luminous Power Infra has been at the forefront of the electrical engineering sector, delivering mission-critical projects that power industries, cities, and entire regions. Our commitment to quality, safety, and sustainable practices ensures that every circuit we design and every substation we build stands resilient against the test of time.
            </p>
            
            <div className="features-list">
              <div className="feature-item">
                <div className="check-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <div>
                  <h4>Zero-Incident Safety Record</h4>
                  <p>Stringent compliance with global safety standards.</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="check-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <div>
                  <h4>Future-Ready Engineering</h4>
                  <p>Incorporating smart grid compatibility from day one.</p>
                </div>
              </div>
            </div>
            
            <a href="#company" className="btn btn-secondary mt-4">Read Full Profile</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
