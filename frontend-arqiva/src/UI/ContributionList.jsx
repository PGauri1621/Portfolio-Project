import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Pagination } from 'react-bootstrap';
import { Tag } from '@blueprintjs/core'; // Import Tag from BlueprintJS
import './ContributionList.css';
import { useFilter } from './ContextManager';
import SearchBox from './SearchBox';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const ContributionList = () => {
    const [contributions, setContributions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const contributionsPerPage = 14;
    const [totalContributions, setTotalContributions] = useState(0);
    const { filters, updateFilters } = useFilter();
    const { searchQuery, selectedStatus } = filters;

    const navigate = useNavigate();

    const currentDateTime = new Date();

    const getStatus = (startTime, endTime) => {
        const start = new Date(startTime);
        const end = new Date(endTime);

        if (end < currentDateTime) {
            return 'Completed';
        } else if (start <= currentDateTime && end >= currentDateTime) {
            return 'Active';
        } else {
            return 'Scheduled';
        }
    };

    const fetchContributions = useCallback(async () => {
        try {
            setLoading(true);
            const params = {
                skip: (currentPage - 1) * contributionsPerPage,
                limit: contributionsPerPage,
                searchQuery,
                status: selectedStatus.join(',')
            };
            const response = await axios.get('http://127.0.0.1:5000/contributions/', { params });
            setContributions(response.data.contributions);
            setTotalContributions(response.data.total);
        } catch (err) {
            console.error('Error fetching contributions:', err);
        } finally {
            setLoading(false);
        }
    }, [currentPage, searchQuery, selectedStatus]);

    // Update the URL whenever filters or pagination changes
    useEffect(() => {
        const queryParams = new URLSearchParams();
        if (searchQuery) queryParams.append('searchQuery', searchQuery);
        if (selectedStatus.length > 0) queryParams.append('status', selectedStatus.join(','));
        queryParams.append('skip', (currentPage - 1) * contributionsPerPage);
        queryParams.append('limit', contributionsPerPage);

        navigate({ search: queryParams.toString() });
    }, [searchQuery, selectedStatus, currentPage, contributionsPerPage, navigate]);

    useEffect(() => {
        fetchContributions();
    }, [fetchContributions]);

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

    // Map status to BlueprintJS Tag color
    const statusColor = (status) => {
        switch (status) {
            case 'Completed':
                return 'success'; // Green for completed
            case 'Active':
                return 'warning'; // Yellow for active
            case 'Scheduled':
                return 'primary'; // Blue for scheduled
            default:
                return 'none';
        }
    };

    return (
        <div className="page-wrapper">
            <Header />
            <div className="content-wrapper">
                <div className="right-side">
                    <SearchBox onSearchFiltersChange={updateFilters} />
                    <div className="contribution-grid">
                        {loading ? (
                            <div>Loading...</div>
                        ) : (
                            filteredContributions.map((contribution) => (
                                <div key={contribution.id} className="contribution-card">
                                    <h3>{contribution.title}</h3>
                                    <p>{contribution.description}</p>
                                    <p>Start Time: {new Date(contribution.startTime).toLocaleString()}</p>
                                    <p>End Time: {new Date(contribution.endTime).toLocaleString()}</p>
                                    <p>Owner: {contribution.owner}</p>
                                    {/* Display status with BlueprintJS Tag */}
                                    <Tag intent={statusColor(getStatus(contribution.startTime, contribution.endTime))}>
                                        {getStatus(contribution.startTime, contribution.endTime)}
                                    </Tag>
                                </div>
                            ))
                        )}
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
