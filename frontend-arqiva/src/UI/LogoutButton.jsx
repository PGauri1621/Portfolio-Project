// LogoutButton.js
import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Optionally, clear any authentication state or tokens here (if needed)
    navigate('/');  // Navigate to the home page
  };

  return (
    <Button variant="secondary" onClick={handleLogout} className="logout-btn">
      Logout
    </Button>
  );
};

export default LogoutButton;
