import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pagination } from 'react-bootstrap';
import './ContributionList.css';
import { useFilter } from './ContextManager';
import UpComingList from './UpComingList';
import SearchBox from './SearchBox';

const ContributionList = () => {
    const [contributions, setContributions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const contributionsPerPage = 14;
    const [totalContributions, setTotalContributions] = useState(0);

    const { filters, updateFilters } = useFilter();
    const { searchQuery, selectedStatus } = filters;

    useEffect(() => {
        const fetchContributions = async () => {
            try {
                setLoading(true);
                const params = {
                    skip: (currentPage - 1) * contributionsPerPage,  // Calculate skip
                    limit: contributionsPerPage,  // Define contributions per page
                    searchQuery,
                };
                const response = await axios.get('http://127.0.0.1:8000/contributions/', { params });
                setContributions(response.data.contributions);
                setTotalContributions(response.data.total);
            } catch (err) {
                console.error('Error fetching contributions:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchContributions();
    }, [currentPage, searchQuery]);

    const filterContributionsByStatus = (contributions) => {
        if (!contributions) return [];
        const currentTime = new Date();

        return contributions.filter((contribution) => {
            const startTime = new Date(contribution.startTime);
            const endTime = new Date(contribution.endTime);
            let status = endTime < currentTime ? 'completed' : startTime > currentTime ? 'scheduled' : 'active';
            return selectedStatus.length === 0 || selectedStatus.includes(status);
        });
    };

    const filteredContributions = filterContributionsByStatus(contributions);

    return (
        <div className="page-wrapper">
            <div className="contribution-list-container">
                <UpComingList />
                <div className="main-content">
                    <SearchBox onSearchFiltersChange={updateFilters} />
                    <div className="contribution-grid">
                        {loading ? <div>Loading...</div> : filteredContributions.map((contribution) => (
                            <div key={contribution.id} className="contribution-card">
                                <h3>{contribution.title}</h3>
                                <p>{contribution.description}</p>
                                <p>Start Time: {new Date(contribution.startTime).toLocaleString()}</p>
                                <p>End Time: {new Date(contribution.endTime).toLocaleString()}</p>
                                <p>Owner: {contribution.owner}</p>
                            </div>
                        ))}
                    </div>
                    <Pagination className="pagination" size="sm">
                        <Pagination.Prev onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPage === 1} />
                        {[...Array(Math.ceil(totalContributions / contributionsPerPage))].map((_, index) => (
                            <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => setCurrentPage(index + 1)}>
                                {index + 1}
                            </Pagination.Item>
                        ))}
                        <Pagination.Next onClick={() => setCurrentPage((p) => p + 1)} disabled={currentPage * contributionsPerPage >= totalContributions} />
                    </Pagination>
                </div>
            </div>
        </div>
    );
};

export default ContributionList;
