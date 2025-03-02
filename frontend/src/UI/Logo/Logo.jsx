
import React from 'react';
import { FaPlayCircle } from 'react-icons/fa'; 
import './Logo.css'; 

const Logo = () => {
  return (
    <div className="logo-container">
      <div className="logo-icon">
        <FaPlayCircle /> 
      </div>
      <div className="logo-text">
        <span className="sugar">SuGa</span><span className="r-media">R Media</span>
      </div>
    </div>
  );
};

export default Logo;
