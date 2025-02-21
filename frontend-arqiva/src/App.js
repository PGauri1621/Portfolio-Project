import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './UI/Home';
import ContributionList from './UI/ContributionList';
import { Link } from 'react-router-dom';  // Import the Link component
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
    // <Router>
    //   <div>
    //     <nav>
    //       <ul>
    //         <li>
    //           <Link to="/">Home</Link>  {/* Use Link component */}
    //         </li>
    //         <li>
    //           <Link to="/contributions">Contributions</Link>  {/* Use Link component */}
    //         </li>
    //       </ul>
    //     </nav>

    //     <Routes>
    //       <Route path="/" element={<Home />} />
    //       <Route path="/contributions" element={<ContributionList />} />
    //     </Routes>
    //   </div>
    // </Router>
  );
};

export default App;

