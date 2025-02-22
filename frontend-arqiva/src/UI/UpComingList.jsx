import React, { useState } from 'react';
import { Card, Form } from 'react-bootstrap';

const UpComingList = () => {
  // Dummy data for upcoming contributions
  const upcomingContributions = [
    {
      id: 1,
      title: 'News',
    },
    {
      id: 2,
      title: 'Cooking',
    },
    {
      id: 3,
      title: 'Sports',
    },
    {
      id: 4,
      title: 'Global Politics',
    },
    {
      id: 5,
      title: 'Fitness',
    },
  ];

  const [selectedContributions, setSelectedContributions] = useState([]);

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setSelectedContributions((prevState) =>
      checked ? [...prevState, value] : prevState.filter((item) => item !== value)
    );
  };

  return (
    <Card className="upcoming-list-container">
      <Card.Header className="card-header">Upcoming Contributions</Card.Header>
      <Card.Body>
        <Form>
          {upcomingContributions.map((contribution) => (
            <Form.Check
              key={contribution.id}
              type="checkbox"
              value={contribution.title}
              id={`checkbox-${contribution.id}`}
              label={
                <>
                  <strong>{contribution.title}</strong>
                  <p>{contribution.description}</p>
                </>
              }
              onChange={handleCheckboxChange}
              className="checkbox-item"
            />
          ))}
        </Form>
      </Card.Body>
    </Card>
  );
};

export default UpComingList;
