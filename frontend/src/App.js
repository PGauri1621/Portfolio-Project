import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './UI/Home/Home.jsx';
import ContributionList from './UI/ContributionList/ContributionList.jsx';
import SignIn from './UI/SignIn/SignIn.jsx';
import Register from './UI/Register/Register.jsx';
import '@blueprintjs/core/lib/css/blueprint.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [showSignIn, setShowSignIn] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contributions" element={<ContributionList />} />
        
        <Route 
          path="/signin" 
          element={<SignIn show={showSignIn} handleClose={() => setShowSignIn(false)} />} 
        />
        
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
