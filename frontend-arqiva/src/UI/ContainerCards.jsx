import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ContainerCards = () => {
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const response = await axios.get('YOUR_API_URL'); // Replace with actual URL
        // Check if 'contributions' is present in the response
        if (response.data && Array.isArray(response.data.contributions)) {
          setContributions(response.data.contributions);
        } else {
          console.error("Error: Expected 'contributions' to be an array.");
        }
      } catch (error) {
        console.error('Error fetching contributions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContributions();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {contributions.length === 0 ? (
        <div>No contributions available</div>
      ) : (
        contributions.map((contribution) => (
          <div key={contribution.id}>
            <h3>{contribution.title}</h3>
            <p>{contribution.description}</p>
            <p>{contribution.owner}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ContainerCards;
