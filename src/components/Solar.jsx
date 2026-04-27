import React, { useEffect } from 'react';
import './Solar.css';

const Solar = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const benefits = [
    {
      title: "Maximum Efficiency",
      description: "We use top-tier monocrystalline panels equipped with advanced micro-inverters for highest yield per square meter.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline>
        </svg>
      )
    },
    {
      title: "Smart Storage",
      description: "Optional lithium-ion battery integration to keep your operations running seamlessly even when the sun goes down.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="10" rx="2" ry="2"></rect><line x1="22" y1="11" x2="22" y2="13"></line><line x1="6" y1="7" x2="6" y2="17"></line>
        </svg>
      )
    },
    {
      title: "Cost Effective",
      description: "Dramatically lower your utility bills and see a reliable ROI with our long-lasting solar infrastructure.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
        </svg>
      )
    },
    {
      title: "Eco-Friendly",
      description: "Join the clean energy revolution. Reduce your carbon footprint and fulfill corporate sustainability goals.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
        </svg>
      )
    }
  ];

  const processSteps = [
    {
      number: "1",
      title: "Site Assessment & Consultation",
      description: "Our engineers evaluate your roof space, shading profile, and historical energy usage to design a custom system specifically tailored for your needs."
    },
    {
      number: "2",
      title: "System Design & Engineering",
      description: "We create a detailed 3D model and electrical single-line diagram ensuring compliance with local grid codes and maximum energy capture."
    },
    {
      number: "3",
      title: "Professional Installation",
      description: "Our certified installation crews deploy your solar array with minimal disruption, adhering to the highest safety and quality standards."
    },
    {
      number: "4",
      title: "Commissioning & Support",
      description: "We activate your system, connect the smart monitoring app, and provide ongoing maintenance to ensure peak performance for decades."
    }
  ];

  return (
    <div className="solar-page animate-fade-in">
      {/* Hero Section */}
      <section className="solar-hero">
        <div className="solar-hero-bg"></div>
        <div className="container">
          <h1 className="solar-title">
            Harness the Power of <br />
            <span className="text-gradient-power">Solar Energy</span>
          </h1>
          <p className="solar-subtitle">
            Transform your property into an independent power plant with our cutting-edge turnkey solar installation solutions for commercial and residential applications.
          </p>
          <div className="solar-hero-visual">
             <svg className="sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
             </svg>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="solar-features-section">
        <div className="container">
          <h2 className="section-title">Why Choose Our <span className="text-gradient-power">Solar Arrays</span>?</h2>
          <p className="section-subtitle">We don't just put panels on roofs. We engineer robust, intelligent energy systems designed for long-term reliability.</p>
          
          <div className="benefits-grid">
            {benefits.map((benefit, index) => (
              <div className={`benefit-card delay-${(index % 3) + 1}`} key={index}>
                <div className="benefit-icon">
                  {benefit.icon}
                </div>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="process-section">
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2 className="section-title">Our <span className="text-gradient-power">Installation</span> Process</h2>
          
          <div className="process-timeline">
            {processSteps.map((step, index) => (
              <div className="process-step" key={index}>
                <div className="step-number">{step.number}</div>
                <div className="step-content">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-box">
            <h2>Ready to Go Solar?</h2>
            <p>Get a free, zero-obligation assessment of your property's solar potential and start saving on energy costs today.</p>
            <button className="btn btn-power">Request Solar Quote</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Solar;
