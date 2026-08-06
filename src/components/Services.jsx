import React from 'react';
import { Link } from 'react-router-dom';
import './Services.css';

const servicesData = [
  {
    id: 1,
    title: "Illumination",
    description: "Design, supply, installation, and commissioning of professional LED lighting systems.",
    bulletPoints: [
      "LED lighting for Roads, Highways, and Streets as per IRC Code standards",
      "LED lights with suitable electrical wiring in Industries and Institutions as per IS Standards"
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
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
    ),
    color: "blue",
    link: "#"
  },
  {
    id: 2,
    title: "Solar Power Solutions",
    description: "Eco-friendly, ground-mounted and rooftop solar power infrastructure.",
    bulletPoints: [
      "Supply and Installation of Off-Grid and On-Grid Ground Solar Systems for Street lighting",
      "Rooftop Solar Systems for Hospitals, Industries, and Institutions"
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      </svg>
    ),
    color: "yellow",
    link: "/solar"
  },
  {
    id: 3,
    title: "Road Furniture",
    description: "Complete manufacturing and installation of highway safety fixtures.",
    bulletPoints: [
      "Supply & Installation of Traffic Sign Boards, Road Studs, and Delineators",
      "Gantry & Cantilever Structures for Sign Boards and LED Boards",
      "Supply & Installation of Metal Beam Crash Barriers and Road Markings"
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 22V2M4 5h16l-3 4 3 4H4" />
      </svg>
    ),
    color: "orange",
    link: "#"
  },
  {
    id: 4,
    title: "Traffic Management",
    description: "Advanced surveillance and camera solutions for intelligent roadways.",
    bulletPoints: [
      "Supply & Installation of pole-mounted PTZ and CCTV Cameras",
      "Supply & Installation of Gantry-mounted Cameras & VMS System"
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>
      </svg>
    ),
    color: "cyan",
    link: "#"
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
                <p style={{ marginBottom: '1rem', minHeight: '48px' }}>{service.description}</p>
                {service.bulletPoints && (
                  <ul className="service-bullet-points">
                    {service.bulletPoints.map((bp, i) => (
                      <li key={i}>{bp}</li>
                    ))}
                  </ul>
                )}
                <div style={{ marginTop: 'auto' }}>
                  <Link to={service.link} className="learn-more">
                    Learn More 
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
