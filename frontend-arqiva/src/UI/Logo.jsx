// src/Logo.jsx
import React from 'react';
import { FaPlayCircle } from 'react-icons/fa';  // Media related icon
import './Logo.css';  // We'll style the logo in a separate CSS file

const Logo = () => {
  return (
    <div className="logo-container">
      <div className="logo-icon">
        <FaPlayCircle />  {/* Play button icon */}
      </div>
      <div className="logo-text">
        <span className="sugar">Suga</span><span className="r-media">R Media</span>  {/* Split the text for creative styling */}
      </div>
    </div>
  );
};

export default Logo;
