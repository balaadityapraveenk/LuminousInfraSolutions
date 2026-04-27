import React from 'react';
import { Link } from 'react-router-dom';
import './Services.css';

const servicesData = [
  {
    id: 1,
    title: "High Voltage Substations",
    description: "Turnkey solutions for AIS and GIS substations up to 765kV, fully integrated with advanced automation systems.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    color: "blue",
    link: "#"
  },
  {
    id: 2,
    title: "Transmission Lines",
    description: "Design, testing, and commissioning of overhead and underground transmission infrastructure.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line>
      </svg>
    ),
    color: "orange",
    link: "#"
  },
  {
    id: 3,
    title: "Smart Grid Integration",
    description: "Implementing SCADA, ADMS, and IoT-based monitoring for modern grid stability and efficiency.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line>
      </svg>
    ),
    color: "cyan",
    link: "#"
  },
  {
    id: 4,
    title: "Renewable Energy Parks",
    description: "Complete electrical balance of plant (eBoP) for large-scale solar and wind power generation.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
    ),
    color: "yellow",
    link: "/solar"
  }
];

const Services = () => {
  return (
    <section id="services" className="services">
      <div className="container">
        <h2 className="section-title">Core <span className="text-gradient">Solutions</span></h2>
        <p className="section-subtitle">Delivering robust and intelligent electrical infrastructure for the demands of tomorrow.</p>
        
        <div className="services-grid">
          {servicesData.map((service, index) => (
            <div className={`service-card delay-${index % 3 + 1}`} key={service.id}>
              <div className="card-border"></div>
              <div className="card-content">
                <div className={`icon-box color-${service.color}`}>
                  {service.icon}
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <Link to={service.link} className="learn-more">
                  Learn More 
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
