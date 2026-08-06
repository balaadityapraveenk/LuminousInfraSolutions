import React from 'react';
import './Projects.css';

const projectsData = [
  {
    id: 1,
    highway: "NH-216",
    title: "Repalle – Epurupalem Industrial Corridor",
    scope: [
      "Poles installation and setup",
      "High Masts supply and assembly",
      "Advanced LED Lighting systems"
    ],
    status: "Completed",
    badgeColor: "success"
  },
  {
    id: 2,
    highway: "NH-16",
    title: "Chilakaluripeta By Pass Road",
    scope: [
      "LED Lights deployment",
      "Structural Poles erection",
      "High Masts commissioning",
      "Solar Street Lights integration"
    ],
    status: "Completed",
    badgeColor: "success"
  },
  {
    id: 3,
    highway: "NH-516F",
    title: "Samarlakota – Achampet Road",
    scope: [
      "Traffic Sign Boards fabrication",
      "Gantry & Cantilever structures",
      "Gantry-mounted LED Sign Boards"
    ],
    status: "Under Execution",
    badgeColor: "progress"
  }
];

const Projects = () => {
  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2 className="section-title">Key <span className="text-gradient">Projects</span></h2>
        <p className="section-subtitle">Delivering high-profile, mission-critical infrastructure projects on national highways.</p>
        
        <div className="projects-grid">
          {projectsData.map((project, index) => (
            <div className={`project-card delay-${index + 1}`} key={project.id}>
              <div className="project-badge-overlay">
                <span className="highway-tag">{project.highway}</span>
                <span className={`status-badge ${project.badgeColor}`}>{project.status}</span>
              </div>
              <div className="project-card-content">
                <h3>{project.title}</h3>
                <div className="scope-header">Project Scope:</div>
                <ul className="scope-list">
                  {project.scope.map((item, i) => (
                    <li key={i}>
                      <span className="scope-dot"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
