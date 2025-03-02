
import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/'); 
  };

  return (
    <Button variant="secondary" onClick={handleLogout} className="logout-btn">
      Logout
    </Button>
  );
};

export default LogoutButton;
