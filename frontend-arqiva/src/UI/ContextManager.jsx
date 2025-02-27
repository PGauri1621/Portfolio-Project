import React, { createContext, useContext, useState } from 'react';

// Create a context for user data
const UserContext = createContext();

// Provider component for user data
export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);  // To store logged-in user data

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to access user context
export const useUser = () => {
  return useContext(UserContext);
};

// Create a context for filters
const FilterContext = createContext();

// Provider component for filters
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
