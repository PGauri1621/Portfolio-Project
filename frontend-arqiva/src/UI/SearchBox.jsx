import React, { useState } from 'react';
import './SearchBox.css';
const SearchBox = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="search-box">
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search..."
            />
        </div>
    );
};

export default SearchBox;
