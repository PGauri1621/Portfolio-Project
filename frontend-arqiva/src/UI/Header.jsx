import React from 'react';
import LogoutButton from './LogoutButton'; // Import LogoutButton
import './Header.css'
import { Navbar, Nav, Container, Button, Row, Col } from 'react-bootstrap';
import Logo from './Logo';  // Import Logo Component

const Header = () => {
    return (
        <div className="header">
            <Navbar.Brand href="#home">
            <Logo />
          </Navbar.Brand>
          <h3 className='Welcome-text'>Welcome,Gauri!</h3>
            {/* Logout Button positioned at the top-right */}
            <LogoutButton />
        </div>
    );
};

export default Header;
