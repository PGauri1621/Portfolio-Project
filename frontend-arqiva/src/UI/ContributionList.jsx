import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Import axios

const ContributionList = () => {
    const [contributions, setContributions] = useState([]);
    const [loading, setLoading] = useState(true);

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
        <div>
            <h1>Contributions</h1>
            <ul>
                {contributions.map((contribution) => (
                    <li key={contribution.id}>
                        <h3>{contribution.title}</h3>
                        <p>{contribution.description}</p>
                        <p>{contribution.startTime}</p>
                        <p>{contribution.endTime}</p>
                        <p>Owner: {contribution.owner}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ContributionList;
