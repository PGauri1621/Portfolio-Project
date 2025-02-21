// Footer.jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'; // Using react-icons for social media icons
import './Footer.css'; // Import CSS for styling

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col xs={12} md={6}>
            <div className="contact-info">
              <h5>Contact Us</h5>
              <p>Email: info@sugarmedia.com</p>
              <p>Phone: +123 456 7890</p>
              <p>Address: 123 Sugar Media St, City, Country</p>
            </div>
          </Col>
          <Col xs={12} md={6} className="social-icons">
            <h5>Follow Us</h5>
            <div>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook className="social-icon" />
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter className="social-icon" />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="social-icon" />
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="social-icon" />
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
