import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="logo">
              <div className="logo-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 2L4.09347 12.6879C3.74466 13.1064 4.04236 13.75 4.58559 13.75H11L10 22L19.9065 11.3121C20.2553 10.8936 19.9576 10.25 19.4144 10.25H13L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="logo-text">Luminous<span className="text-gradient">Infra</span></span>
            </div>
            <p className="footer-bio">
              Empowering the future through intelligent and reliable electrical infrastructure. Building a sustainable power grid for generations to come.
            </p>
          </div>
          
          <div className="footer-links">
            <div className="link-column">
              <h4>Solutions</h4>
              <ul>
                <li><a href="#services">Illumination</a></li>
                <li><Link to="/solar">Solar Power</Link></li>
                <li><a href="#services">Road Furniture</a></li>
                <li><a href="#services">Traffic Management</a></li>
              </ul>
            </div>
            
            <div className="link-column">
              <h4>Company</h4>
              <ul>
                <li><a href="#about">About Us</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            
            <div className="link-column">
              <h4>Legal</h4>
              <ul>
                <li><a href="#privacy">Privacy Policy</a></li>
                <li><a href="#terms">Terms of Service</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Luminous Power Infra. All rights reserved.</p>
          <div className="footer-certifications">
            <span>ISO 9001:2015</span>
              <span className="dot"></span>
            <span>GSTIN:</span>
            <span className="dot"></span>
            <span>OSHAS 18001</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
