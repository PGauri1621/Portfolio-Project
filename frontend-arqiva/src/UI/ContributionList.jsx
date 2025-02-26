import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Pagination } from 'react-bootstrap';
import './ContributionList.css';
import { useFilter } from './ContextManager';
import UpComingList from './UpComingList';
import SearchBox from './SearchBox';
import { useNavigate } from 'react-router-dom';  // import useNavigate from react-router-dom v6
import LogoutButton from './LogoutButton';  // Import LogoutButton
import Header from './Header'; // Import the Header component

const ContributionList = () => {
    const [contributions, setContributions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const contributionsPerPage = 14;
    const [totalContributions, setTotalContributions] = useState(0);
    const { filters, updateFilters } = useFilter();
    const { searchQuery, selectedStatus } = filters;

    const navigate = useNavigate();  // using navigate instead of useHistory

    // Use useCallback to memoize fetchContributions to avoid re-creations on every render
    const fetchContributions = useCallback(async () => {
        try {
            setLoading(true);
            const params = {
                skip: (currentPage - 1) * contributionsPerPage,  // Calculate skip
                limit: contributionsPerPage,  // Define contributions per page
                searchQuery,
                status: selectedStatus.join(',')  // Include status filter if any
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

        navigate({ search: queryParams.toString() }); // changed from history.push() to navigate()
    }, [searchQuery, selectedStatus, currentPage, contributionsPerPage, navigate]);

    // Trigger fetchContributions when any filter or page changes
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

    return (
        <div className="page-wrapper">
            {/* Header component now placed at the top */}
            <Header />
            <div className="content-wrapper">
                {/* Left section with UpcomingList */}
                <div className="left-side">
                    <UpComingList />
                </div>
                {/* Right section with SearchBox and Contribution List */}
                <div className="right-side">
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
