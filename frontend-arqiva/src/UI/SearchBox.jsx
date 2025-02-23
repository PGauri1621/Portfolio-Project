import React, { useState } from 'react';
import './SearchBox.css';

const SearchBox = ({ onSearchFiltersChange }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchChange = () => {
        // Only send a filter if there's a non-empty search query
        const filters = searchQuery.trim() ? { searchQuery: searchQuery.trim() } : {};
        onSearchFiltersChange(filters);
    };

    return (
        <div className="search-box">
            <input
                type="text"
                value={searchQuery}
                onChange={handleInputChange}
                placeholder="Search by title, owner, or description"
            />
            <button onClick={handleSearchChange}>Search</button>
        </div>
    );
};

export default SearchBox;
