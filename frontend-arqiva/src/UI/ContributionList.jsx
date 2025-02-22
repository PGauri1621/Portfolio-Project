import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pagination } from 'react-bootstrap'; // Import Pagination component from react-bootstrap
import './ContributionList.css';
import { Callout } from '@blueprintjs/core';

import UpComingList from './UpComingList';  // Import the UpComingList component
import SearchBox from './SearchBox';   

const ContributionList = () => {
    const [contributions, setContributions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);  // State to track the current page
    const [contributionsPerPage] = useState(14);  // Number of contributions to display per page

    const currentDateTime = new Date(); // Get the current date and time

    useEffect(() => {
        const fetchContributions = async () => {
            try {
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

    // Get the index of the first contribution on the current page
    const indexOfLastContribution = currentPage * contributionsPerPage;
    const indexOfFirstContribution = indexOfLastContribution - contributionsPerPage;

    // Get the current contributions to display
    const currentContributions = contributions.slice(indexOfFirstContribution, indexOfLastContribution);

    // Handle page change
    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) return <div>Loading...</div>;

    // Calculate total pages
    const totalPages = Math.ceil(contributions.length / contributionsPerPage);

    return (
        <div className="page-wrapper">
            <div className="contribution-list-container">
          {/* Left-side component (UpComingList) */}
          <div className="left-side">
              <UpComingList />
          </div>

          <div className="main-content">
              {/* Header with SearchBox */}
              <div className="header">
                  <SearchBox />
              </div>

              <div className="contribution-grid">
                  {currentContributions.map((contribution) => {
                      const startTime = new Date(contribution.startTime);
                      const isComplete = startTime < currentDateTime;

                      return (
                          <div key={contribution.id} className="contribution-card">
                              <h3>{contribution.title}</h3>
                              <p>{contribution.description}</p>
                              <p>Start Time: {contribution.startTime}</p>
                              <p>End Time: {contribution.endTime}</p>
                              <p>Owner: {contribution.owner}</p>

                              {isComplete ? (
                                  <Callout intent="success">Status: Completed</Callout>
                              ) : (
                                  <Callout intent="primary">Status: Ongoing</Callout>
                              )}
                          </div>
                      );
                  })}
              </div>

              <Pagination className="pagination" size="sm">
                  <Pagination.Prev
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                  />
                  {[...Array(totalPages)].map((_, index) => (
                      <Pagination.Item
                          key={index + 1}
                          active={index + 1 === currentPage}
                          onClick={() => handlePageChange(index + 1)}
                      >
                          {index + 1}
                      </Pagination.Item>
                  ))}
                  <Pagination.Next
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                  />
              </Pagination>
          </div>
      </div>
        </div>
      
  );
};

export default ContributionList;
