import React, { useState } from 'react';
import './Contact.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:5000';

const projectLabels = {
  substation: 'Substation Construction',
  transmission: 'Transmission Lines',
  smartgrid: 'Smart Grid Integration',
  solar: 'Rooftop Solar',
  other: 'Other Inquiry',
};

const Contact = () => {
  const [formStatus, setFormStatus] = useState('idle');
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    setFormError('');

    const form = e.currentTarget;
    const formData = new FormData(form);
    const projectValue = formData.get('project');

    try {
      const response = await fetch(`${API_BASE_URL}/api/requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.get('name'),
          company: formData.get('company'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          location: formData.get('location'),
          project: projectLabels[projectValue] || projectValue,
          message: formData.get('message'),
        }),
      });

      if (!response.ok) {
        throw new Error('Unable to save the request. Please try again.');
      }

      setFormStatus('success');
      form.reset();
      setTimeout(() => setFormStatus('idle'), 3000);
    } catch (error) {
      setFormStatus('idle');
      setFormError(error.message);
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="contact-wrapper">
          <div className="contact-info">
            <h2>Ready to power <br /><span className="text-gradient">your next project?</span></h2>
            <p className="subtitle">Connect with our engineering experts to discuss customized infrastructure solutions.</p>

            <div className="info-cards">
              <div className="info-card">
                <div className="icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                </div>
                <div>
                  <h5>Global Headquarters</h5>
                  <p>+91 9642078989</p>
                </div>
              </div>
              <div className="info-card">
                <div className="icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </div>
                <div>
                  <h5>Technical Inquiries</h5>
                  <p>Lpis78989@gmail.com</p>
                </div>
              </div>
            </div>

            <div className="social-links">
              <a href="#linkedin" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="#twitter" aria-label="Twitter">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
              </a>
            </div>
          </div>

          <div className="contact-form-container">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="input-group">
                  <label htmlFor="name">Full Name</label>
                  <input type="text" id="name" name="name" required />
                </div>
                <div className="input-group">
                  <label htmlFor="company">Company</label>
                  <input type="text" id="company" name="company" />
                </div>
              </div>
              <div className="input-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" name="email" required />
              </div>
              <div className="input-group">
                <label htmlFor="phone">Phone Number</label>
                <input type="tel" id="phone" name="phone" />
              </div>
              <div className="input-group">
                <label htmlFor="location">Project Location</label>
                <input type="text" id="location" name="location" placeholder="City, state, or site area" />
              </div>
              <div className="input-group">
                <label htmlFor="project">Project Scope</label>
                <select id="project" name="project" required defaultValue="">
                  <option value="" disabled>Select an option</option>
                  <option value="substation">Substation Construction</option>
                  <option value="transmission">Transmission Lines</option>
                  <option value="smartgrid">Smart Grid Integration</option>
                  <option value="solar">Rooftop Solar</option>
                  <option value="other">Other Inquiry</option>
                </select>
              </div>
              <div className="input-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows="4" required></textarea>
              </div>
              {formError && <p className="form-error">{formError}</p>}

              <button
                type="submit"
                className={`btn btn-primary submit-btn ${formStatus === 'submitting' ? 'loading' : ''}`}
                disabled={formStatus === 'submitting'}
              >
                {formStatus === 'idle' && 'Request Consultation'}
                {formStatus === 'submitting' && 'Sending...'}
                {formStatus === 'success' && 'Message Received!'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
