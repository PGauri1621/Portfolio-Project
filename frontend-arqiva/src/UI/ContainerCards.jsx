import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom

const ContainerCards = ({ header, title, text, buttonText, companyClass, linkTo }) => {
  return (
    <Card>
      <Card.Header className={companyClass}>{header}</Card.Header>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{text}</Card.Text>
        {/* Render the Link component around the button */}
        <Link to={linkTo}>
          <button className="btn btn-primary">{buttonText}</button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default ContainerCards;