import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import './Footer.css'; // Import CSS for styling

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          {/* Contact Information */}
          <Col xs={12} md={3}>
            <div className="contact-info">
              <h5>Contact Us</h5>
              <p>Email: info@sugarmedia.com</p>
              <p>Phone: +123 456 7890</p>
              <p>Address: 123 Sugar Media St, London, England, UK</p>
            </div>
          </Col>

          {/* About Us Section */}
          <Col xs={12} md={3}>
            <div className="about-us">
              <h5>About Us</h5>
              <p>
                We are a dynamic media company providing top-tier content and digital marketing services. 
                Our mission is to connect people and businesses with the power of media.
              </p>
            </div>
          </Col>

          {/* Quick Links Section */}
          <Col xs={12} md={3}>
            <div className="quick-links">
              <h5>Quick Links</h5>
              <ul>
                <li><a href="/home">Home</a></li>
                <li><a href="/about">About Us</a></li>
                <li><a href="/services">Services</a></li>
                <li><a href="/contact">Contact</a></li>
              </ul>
            </div>
          </Col>

          {/* Social Media Icons */}
          <Col xs={12} md={3} className="social-icons">
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

        {/* Copyright Notice */}
        <Row>
          <Col xs={12} className="text-center mt-4">
            <p className="copyright">© 2025 SuGaR Media. All Rights Reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
