import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import teamMember2Image from '../UI/Photo1.jpg'; // Adjust the path if necessary
import teamMember1Image from '../UI/Gauri.JPG'; // Adjust the path if necessary

const MeetOurTeam = () => {
  return (
    <section className="meet-our-team">
      <Container>
        <Row>
          <Col xs={12} md={6}>
            <Card className="team-card">
              <Row className="align-items-center">
                <Col xs={4}>
                  <Card.Img src={teamMember1Image} alt="Team Member 1" className="team-img" />
                </Col>
                <Col xs={8}>
                  <Card.Body>
                    <Card.Title>Gauri Mudiraj Parvate</Card.Title>
                    <Card.Text>
                      Gauri is the CEO and the visionary behind SuGaR Media. With over 4 years of experience in Software Development, she leads the team in providing innovative media solutions.
                    </Card.Text>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Col>

          <Col xs={12} md={6}>
            <Card className="team-card">
              <Row className="align-items-center">
                <Col xs={4}>
                  <Card.Img src={teamMember2Image} alt="Team Member 2" className="team-img" />
                </Col>
                <Col xs={8}>
                  <Card.Body>
                    <Card.Title>Sumit Parvate</Card.Title>
                    <Card.Text>
                      Sumit is the Creative Director, Product Owner, and a Co-Founder of SuGaR Media. He brings unique artistic direction and creative ideas to every project, ensuring content stands out.
                    </Card.Text>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default MeetOurTeam;
