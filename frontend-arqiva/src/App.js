import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './UI/Home.jsx';
import ContributionList from './UI/ContributionList.jsx';
import '@blueprintjs/core/lib/css/blueprint.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contributions" element={<ContributionList />} />
      </Routes>
    </Router>
  );
};

export default App;
