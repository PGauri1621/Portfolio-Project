// Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Home.css';
import ContainerCards from './ContainerCards.jsx';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Footer from './Footer'; // Import Footer component

const Home = () => {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home" className="navbar-brand">SuGaR Media</Navbar.Brand>
          <Nav className="nav-center">
            <Nav.Link href="#home">About</Nav.Link>
            <Nav.Link href="#features">Media</Nav.Link>
            <Nav.Link href="#pricing">Utilities</Nav.Link>
            <Nav.Link href="#features">Satellite Data</Nav.Link>
            <Nav.Link href="#pricing">News & Views</Nav.Link>
            <Nav.Link href="#features">Life & News</Nav.Link>
            <Nav.Link href="#pricing">Contact</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div className="home-container">
        <Container className="my-4">
          <Row xs={1} md={2} lg={2} className="g-4">
            {/* BBC Card */}
            <Col>
              <ContainerCards 
                header="BBC"
                title="BBC News"
                text="This is the content for the BBC card. It includes some introductory text about BBC."
                buttonText="Go somewhere"
                companyClass="bbc"
                linkTo="/bbc"  // linkTo prop for BBC
              />
            </Col>

            {/* LBC Radio Card */}
            <Col>
              <ContainerCards 
                header="LBC Radio"
                title="LBC News"
                text="This is the content for the LBC Radio card. Learn more about LBC and its programming."
                buttonText="Go somewhere"
                companyClass="lbc"
                linkTo="/lbc"  // linkTo prop for LBC Radio
              />
            </Col>

            {/* ITV4 Card */}
            <Col>
              <ContainerCards 
                header="ITV4"
                title="ITV4 Channel"
                text="Content for ITV4. Explore the best shows and programs available on ITV4."
                buttonText="Go somewhere"
                companyClass="itv4"
                linkTo="/itv4"  // linkTo prop for ITV4
              />
            </Col>

            {/* Explore Card with Link to ContributionList */}
            <Col>
              <ContainerCards 
                header="Explore"
                title="Company X News"
                text="This is the content for another company card. Discover more about Company X."
                buttonText="Find out more"
                companyClass="other"
                linkTo="/contributions"  // linkTo prop for Explore Card
              />
            </Col>
          </Row>
        </Container>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Home;
