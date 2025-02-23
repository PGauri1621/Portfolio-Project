// src/UI/ContextManager.js
import React, { createContext, useContext, useState } from 'react';

// Create a context
const FilterContext = createContext();

// Provider component
export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    searchQuery: '',
    selectedOwners: [],
    selectedStatus: [], // Track selected status for filter
  });

  const updateFilters = (newFilters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
  };

  return (
    <FilterContext.Provider value={{ filters, updateFilters }}>
      {children}
    </FilterContext.Provider>
  );
};

// Custom hook to use filter context
export const useFilter = () => {
  return useContext(FilterContext);
};
