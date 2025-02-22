import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';

const WhatWeDo = () => {
  return (
    <section className="what-we-do">
      <Container>
        <Row>
          <Col xs={12} md={12}>
            <Card className="text-center">
              <Card.Body>
                <Card.Title>What We Do?</Card.Title>
                <Card.Text>
                  At Sugar Media, we bring innovative solutions to help brands connect with their audience. Our team excels in creating dynamic content strategies, digital marketing, and media campaigns that drive results.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default WhatWeDo;
