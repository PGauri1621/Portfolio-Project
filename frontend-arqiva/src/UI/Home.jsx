import React, { useState } from 'react';
import { Navbar, Nav, Container, Button, Row, Col } from 'react-bootstrap';
import SignIn from './SignIn.jsx';
import Register from './Register.jsx';
import ContainerCards from './ContainerCards';
import Footer from './Footer';
import Logo from './Logo';
import './Home.css';
import NavDropdown from 'react-bootstrap/NavDropdown';
import WhatWeDo from './WhatWeDo.jsx';
import MeetOurTeam from './MeetOurTeam.jsx';
import { Link } from 'react-router-dom';
import CookiesFooter from './CookiesFooter';
import SuccessStories from './SuccessStories';  // Import SuccessStories component
import GooglePlay from '../UI/AP.jpeg'
import AppStore from '../UI/Google.png'

const Home = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleSignInClose = () => setShowSignIn(false);
  const handleSignInShow = () => setShowSignIn(true);

  const handleRegisterClose = () => setShowRegister(false);
  const handleRegisterShow = () => setShowRegister(true);

  return (
    <>
      {/* Navbar */}
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">
            <Logo />
          </Navbar.Brand>
          <Nav className="nav-center">
            <Nav.Link href="#home">About us</Nav.Link>
            <Nav.Link href="#features">Media</Nav.Link>
            <NavDropdown title="Careers" id="navbar-investors-dropdown" className="nav-dropdown">
              <NavDropdown.Item href="Job1">Job1</NavDropdown.Item>
              <NavDropdown.Item href="#Job2">Job2</NavDropdown.Item>
              <NavDropdown.Item href="#Job3">Job3</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Investors" id="navbar-investors-dropdown" className="nav-dropdown">
              <NavDropdown.Item href="#investment1">Investment 1</NavDropdown.Item>
              <NavDropdown.Item href="#investment2">Investment 2</NavDropdown.Item>
              <NavDropdown.Item href="#investment3">Investment 3</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Languages" id="navbar-languages-dropdown" className="nav-dropdown">
              <NavDropdown.Item href="#english">English</NavDropdown.Item>
              <NavDropdown.Item href="#spanish">Spanish</NavDropdown.Item>
              <NavDropdown.Item href="#french">French</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Button variant="outline-light" onClick={handleSignInShow}>
              Sign In
            </Button>
            <Button variant="outline-light" onClick={handleRegisterShow} className="ms-2">
              Register
            </Button>
          </Nav>
        </Container>
      </Navbar>

      {/* What We Do Section */}
      <WhatWeDo />

      {/* Success Stories Slideshow */}
      <SuccessStories />  {/* Insert Success Stories here */}

      {/* Main Content: Container Cards */}
      <div className="home-container">
        <Container className="my-4">
          <Row xs={1} md={2} lg={2} className="g-4">
            <Col>
              <ContainerCards header="BBC" title="BBC News" text="This is the content for the BBC card." buttonText="Go somewhere" companyClass="bbc" linkTo="/bbc" />
            </Col>
            <Col>
              <ContainerCards header="LBC Radio" title="LBC News" text="This is the content for the LBC Radio card." buttonText="Go somewhere" companyClass="lbc" linkTo="/lbc" />
            </Col>
            <Col>
              <ContainerCards header="ITV4" title="ITV4 Channel" text="Content for ITV4." buttonText="Go somewhere" companyClass="itv4" linkTo="/itv4" />
            </Col>
            <Col>
              <ContainerCards header="Explore" title="Excited to be part of our journey?" text="SignIn/Register to be part of our journey!" buttonText="Find out more" companyClass="other" />
            </Col>
          </Row>
        </Container>
      </div>

      {/* App Store and Google Play Placeholder Section */}
      <div className="app-store-section">
        <h3>Download Our App</h3>
        <div className="app-links">
          <a href="#" className="app-link">
            <img src={GooglePlay} alt="Google Play Store" />
          </a>
          <a href="#" className="app-link">
            <img src={AppStore} alt="App Store" />
          </a>
        </div>
        <div className="app-rating">
          <p className="rating-text">4.5 <span className="star-rating">★ ★ ★ ★ ☆</span></p>
        </div>
      </div>

      {/* Meet Our Team Section */}
      <div className="team-introduction">
        <h2 className="team-title">Team at SuGaR</h2>
        <hr className="team-divider" />
      </div>

      {/* Meet Our Team Section */}
      <MeetOurTeam />
      <Footer />

      {/* Sign In Modal */}
      <SignIn show={showSignIn} handleClose={handleSignInClose} />

      {/* Register Modal */}
      <Register show={showRegister} handleClose={handleRegisterClose} />

      {/* Cookie Consent Footer */}
      <CookiesFooter />
    </>
  );
};

export default Home;
