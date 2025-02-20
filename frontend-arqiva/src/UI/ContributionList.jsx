import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Import axios
import './ContributionList.css';  // Import the CSS file
import { Callout } from "@blueprintjs/core";


const ContributionList = () => {
    const [contributions, setContributions] = useState([]);
    const [loading, setLoading] = useState(true);

    const currentDateTime = new Date(); // Get the current date and time

    useEffect(() => {
        const fetchContributions = async () => {
            try {
                // Use axios to make the GET request
                const response = await axios.get('http://127.0.0.1:8000/contributions/');
                setContributions(response.data.contributions);  // Set the response data to state
                
            } catch (err) {
                console.error('Error fetching contributions:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchContributions();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="contribution-grid">
          {contributions.map((contribution) => {
            const startTime = new Date(contribution.startTime); // Convert to Date
            const isComplete = startTime < currentDateTime; // Check if it is completed (in the past)
    
            return (
              <div key={contribution.id} className="contribution-card">
                <h3>{contribution.title}</h3>
                <p>{contribution.description}</p>
                <p>Start Time: {contribution.startTime}</p>
                <p>End Time: {contribution.endTime}</p>
                <p>Owner: {contribution.owner}</p>
    
                {/* Conditionally render the Callout based on the completion status */}
                {isComplete ? (
                  <Callout intent="success">Status: Completed</Callout>
                ) : (
                  <Callout intent="primary">Status: Ongoing</Callout>
                )}
              </div>
            );
          })}
        </div>
      );
};

export default ContributionList;
