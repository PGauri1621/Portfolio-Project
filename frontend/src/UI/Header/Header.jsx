import React from 'react';
import LogoutButton from '../LogoutButton/LogoutButton';
import './Header.css';
import { Navbar} from 'react-bootstrap';
import Logo from '../Logo/Logo'; 
import { useUser } from '../ContextManager/ContextManager';

const Header = () => {
  const { userData } = useUser(); 

  return (
    <div className="header">
      <Navbar.Brand>
        <Logo />
      </Navbar.Brand>
      <h3 className='Welcome-text'>Welcome, {userData ? userData.name : 'Guest'}!</h3>
      <LogoutButton />
    </div>
  );
};

export default Header;
