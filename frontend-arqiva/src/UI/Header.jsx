import React from 'react';
import LogoutButton from './LogoutButton'; // Import LogoutButton
import './Header.css';
import { Navbar, Nav, Container, Button, Row, Col } from 'react-bootstrap';
import Logo from './Logo';  // Import Logo Component
import { useUser } from './ContextManager'; // Import the useUser hook to get user data

const Header = () => {
  // Get the logged-in user data from context
  const { userData } = useUser(); 

  return (
    <div className="header">
      <Navbar.Brand href="#home">
        <Logo />
      </Navbar.Brand>
      {/* Display the user's name or a placeholder */}
      <h3 className='Welcome-text'>Welcome, {userData ? userData.name : 'Guest'}!</h3>
      {/* Logout Button positioned at the top-right */}
      <LogoutButton />
    </div>
  );
};

export default Header;
