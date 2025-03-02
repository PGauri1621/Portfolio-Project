import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import './Footer.css'; 
import GoogleMaps from '../UI/Maps.jpg_large';

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="footer-row">
          {/* Contact Information */}
          <Col xs={12} md={3} className="footer-column">
            <div className="contact-info">
              <h5>Contact Us</h5>
              <p>Email: info@sugarmedia.com</p>
              <p>Phone: +123 456 7890</p>
              <p>Address: 123 Sugar Media St, London, England, UK</p>
            </div>
          </Col>

          {/* Legal Section */}
          <Col xs={12} md={3} className="footer-column">
            <div className="legal">
              <h5>Legal</h5>
              <p>
                This website is owned and operated by Sugar Media. By using this website, you agree to 
                comply with the terms and conditions set forth. For more details, please refer to our 
                <a href="/terms" target="_blank" rel="noopener noreferrer"> Terms of Service</a> and 
                <a href="/privacy-policy" target="_blank" rel="noopener noreferrer"> Privacy Policy</a>.
              </p>
            </div>
          </Col>

          {/* Quick Links Section */}
          <Col xs={12} md={3} className="footer-column">
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
          <Col xs={12} md={3} className="footer-column">
            <h5>Follow Us</h5>
            <div className="social-icons">
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

        <Row className="newsletter-sitemap-google">
          <Col xs={12} md={4} className="newsletter-column">
            <div className="newsletter-content">
              <h5>Subscribe to Our Newsletter</h5>
              <p>Get the latest news, updates, and offers from Sugar Media directly to your inbox.</p>
              <Form action="#">
                <Form.Group controlId="newsletterEmail">
                  <Form.Control type="email" placeholder="Enter your email" required />
                </Form.Group>
                <Button variant="primary" type="submit">Subscribe</Button>
              </Form>
            </div>
          </Col>

          <Col xs={12} md={4} className="sitemap-column">
            <h5>Sitemap</h5>
            <ul className="sitemap-links">
              <li><a href="/Accessibility Help">Accessibility Help</a></li>
              <li><a href="/terms">Terms of Service</a></li>
              <li><a href="/privacy-policy">Privacy Policy</a></li>
            </ul>
          </Col>

          <Col xs={12} md={4} className="google-maps-column">
            <div className="google-maps-placeholder">
              <h5>Find Us on Google Maps</h5>
              <img
                src={GoogleMaps}
                alt="Google Maps Placeholder"
                className="maps-image"
              />
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
