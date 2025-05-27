import React from 'react';
import { FaInstagram, FaTwitter, FaEnvelope, FaMonument } from 'react-icons/fa';
import '../styles/footer.css';

const Footer = () => {
  const testimonials = [
    "A treasure trove of historical wisdom!",
    "Revolutionizing how we connect with the past.",
    "The most engaging history resource online.",
    "Simply magnificent - a time traveler's delight."
  ];

  return (
    <footer className="footer-container">
      {/* Hieroglyphic texture background */}
      <div className="hieroglyph-overlay"></div>

      {/* Scrolling marquee */}
      <div className="historical-marquee">
        <div className="marquee-content">
          <span>New Article: Decoding Ancient Egyptian Hieroglyphs</span>
          <FaMonument className="marquee-icon" />
          <span>Featured: The Lost Library of Alexandria</span>
          <FaMonument className="marquee-icon" />
          <span>Exclusive: Interview with Lead Archaeologist</span>
        </div>
      </div>

      <div className="footer-content">
        {/* Social Connections */}
        <div className="footer-section">
          <h3>Connect with History</h3>
          <div className="social-links">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="social-icon" />
              <span>Ancient Chronicles</span>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="social-icon" />
              <span>@EchoesOfHistory</span>
            </a>
            <a href="mailto:contact@echoesofgreatness.com">
              <FaEnvelope className="social-icon" />
              <span>Contact Scholars</span>
            </a>
          </div>
        </div>

        {/* Anonymous Testimonials */}
        <div className="footer-section">
          <h3>Voices from the Past</h3>
          <div className="testimonial-carousel">
            {testimonials.map((text, index) => (
              <div key={index} className="testimonial">
                <div className="papyrus-texture"></div>
                <p className="testimonial-text">"{text}"</p>
                <p className="testimonial-author">- Anonymous Scholar</p>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className="footer-section">
          <h3>Receive Ancient Wisdom</h3>
          <form className="newsletter-form">
            <input 
              type="email" 
              placeholder="Inscribe your email" 
              className="newsletter-input"
            />
            <button type="submit" className="newsletter-button">
              Join the Scrolls
            </button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Echoes of Greatness - Preserving Civilization's Legacy</p>
      </div>
    </footer>
  );
};

export default Footer;