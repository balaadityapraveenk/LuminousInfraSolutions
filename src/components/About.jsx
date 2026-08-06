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
              <span className="years">3+</span>
              <span className="text">Years of<br/>Excellence</span>
            </div>
            <div className="decorative-lines">
              <span></span><span></span><span></span>
            </div>
          </div>
          
          <div className="about-content">
            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
              Who <span className="text-gradient">We Are</span>
            </h2>
            <p className="lead-text">
              Established in 2023, M/s Luminous Power Infra Solutions has rapidly grown as a trusted EPC Partner delivering solutions for all Electrical & Road safety works.
            </p>
            <p className="body-text">
              We undertake Design, Supply, Installation and Commissioning of LED Street Lights, Flood lights, On-grid and Off-grid Solar Power Systems, and CCTV Cameras for Roads, Industries, and Institutions. We also undertake Road Safety works viz. Road Marking, Installation of Traffic Sign Boards, LED Sign Boards, Metal Beam Crash Barriers, and more.
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
