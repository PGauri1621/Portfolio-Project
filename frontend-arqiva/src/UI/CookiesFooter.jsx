import React, { useState, useEffect } from 'react';
import './CookiesFooter.css';

const Cookies = () => {
  const [isCookieAccepted, setIsCookieAccepted] = useState(false);
  const [isCookieRejected, setIsCookieRejected] = useState(false);

  useEffect(() => {
    const cookiesConsent = localStorage.getItem('cookiesAccepted');
    if (cookiesConsent === 'true') {
      setIsCookieAccepted(true);
    } else if (cookiesConsent === 'false') {
      setIsCookieRejected(true);
    }
  }, []);

  const handleAcceptCookies = () => {
    setIsCookieAccepted(true);
    localStorage.setItem('cookiesAccepted', 'true');
  };

  const handleRejectCookies = () => {
    setIsCookieRejected(true);
    localStorage.setItem('cookiesAccepted', 'false');
  };

  if (isCookieAccepted || isCookieRejected) {
    return null; // If cookies are accepted or rejected, hide the cookie notification
  }

  return (
    <div className="cookies-container">
      <div className="cookies-content">
        <h2>We Use Cookies</h2>
        <p>
          This website uses cookies to enhance your experience, improve performance, and analyze site usage. 
          Cookies are small text files stored on your device that help us provide a better browsing experience.
        </p>
        <p>
          By clicking “Accept All Cookies”, you consent to the use of cookies. You can manage your cookie preferences 
          or withdraw your consent at any time in the settings. For more details, please see our 
          <a href="/privacy-policy" className="cookies-link"> Privacy Policy</a>.
        </p>
        <div className="cookies-buttons">
          <button onClick={handleAcceptCookies} className="btn-accept">
            Accept All Cookies
          </button>
          <button onClick={handleRejectCookies} className="btn-reject">
            Reject All Cookies
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cookies;
