import React from 'react';
import { FaHistory, FaUsers, FaBookOpen, FaLightbulb } from 'react-icons/fa';
import '../styles/about.css';

const About = () => {
  return (
    <div className="about-container">
      <section className="about-hero">
        <div className="hero-content">
          <h1>About Echoes of Greatness</h1>
          <p>Discover the timeless stories of history's most influential figures and their enduring legacies</p>
        </div>
      </section>

      <section className="mission-section">
        <div className="mission-content">
          <h2>Our Mission</h2>
          <p>
            Echoes of Greatness is dedicated to preserving and sharing the remarkable stories of individuals who shaped our world. 
            We believe that by understanding these historical figures, we gain insights into our shared humanity and the forces that drive progress.
          </p>
        </div>
        <div className="mission-image">
          <img 
            src="/images/vintagecompass.jpg" 
            alt="Vintage compass" 
            className="mission-img"
          />
        </div>
      </section>

      <section className="features-section">
        <h2>What We Offer</h2>
        <div className="features-grid">
          {/* Feature cards remain the same */}
        </div>
      </section>

      <section className="team-section">
        <h2>Our Team</h2>
        <p className="team-description">
          A passionate group of historians, writers, and technologists committed to making history accessible and engaging.
        </p>
        <div className="team-members">
          <div className="team-member">
            <div className="member-photo">
              <img 
                src="/images/Eleanor.jpeg" 
                alt="Dr. Eleanor Wright" 
                className="member-photo-img"
              />
            </div>
            <h3>Dr. Eleanor Wright</h3>
            <p>Chief Historian</p>
          </div>
          <div className="team-member">
            <div className="member-photo">
              <img 
                src="/images/Marcus.jpeg" 
                alt="Marcus Chen" 
                className="member-photo-img"
              />
            </div>
            <h3>Marcus Chen</h3>
            <p>Lead Writer</p>
          </div>
          <div className="team-member">
            <div className="member-photo">
              <img 
                src="/images/developer.webp" 
                alt="Sarah Johnson" 
                className="member-photo-img"
              />
            </div>
            <h3>Sarah Johnson</h3>
            <p>Web Developer</p>
          </div>
        </div>
      </section>

      <section className="contact-section">
        <h2>Get In Touch</h2>
        <p>Have questions or suggestions? We'd love to hear from you.</p>
        <div className="contact-options">
          <a href="mailto:contact@echoesofgreatness.com" className="contact-button">
            Email Us
          </a>
          <a href="#" className="contact-button">
            Join Our Newsletter
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;
