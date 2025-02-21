import React from 'react';
import { ListGroup, Card } from 'react-bootstrap';

const UpComingList = () => {
  // Dummy data for upcoming contributions
  const upcomingContributions = [
    {
      id: 1,
      title: 'Contribution 1',
      description: 'This is the description for contribution 1.',
      startTime: '2025-03-01T10:00:00',
    },
    {
      id: 2,
      title: 'Contribution 2',
      description: 'This is the description for contribution 2.',
      startTime: '2025-03-05T09:00:00',
    },
    {
      id: 3,
      title: 'Contribution 3',
      description: 'This is the description for contribution 3.',
      startTime: '2025-03-10T14:00:00',
    },
    {
      id: 4,
      title: 'Contribution 4',
      description: 'This is the description for contribution 4.',
      startTime: '2025-03-12T08:00:00',
    },
  ];

  return (
    <Card className="upcoming-list-container">
      <Card.Header className="card-header">Upcoming Contributions</Card.Header>
      <Card.Body>
        <ListGroup>
          {upcomingContributions.map((contribution) => (
            <ListGroup.Item key={contribution.id} className="list-group-item">
              <h5>{contribution.title}</h5>
              <p>{contribution.description}</p>
              <p><strong>Start Time:</strong> {contribution.startTime}</p>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default UpComingList;
