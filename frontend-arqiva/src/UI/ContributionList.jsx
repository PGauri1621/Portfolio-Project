import React, { useState, useEffect } from 'react';

const ContributionList = () => {
    const [contributions, setContributions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContributions = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/contributions/');
                const data = await response.json();
                setContributions(data.contributions);
            } catch (error) {
                console.error('Error fetching contributions:', error);
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
                        <p>Owner: {contribution.owner}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ContributionList;
