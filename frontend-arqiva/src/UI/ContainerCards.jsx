import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ContributionList from './ContributionList';

const ContainerCards = ({ header, title, text, buttonText, companyClass }) => {
  return (
    <Card>
      <Card.Header className={companyClass}>{header}</Card.Header>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{text}</Card.Text>
        <Button variant="primary">{buttonText}</Button>
      </Card.Body>
    </Card>
  );
};

export default ContainerCards;
