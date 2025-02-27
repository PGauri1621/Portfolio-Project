import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { FilterProvider, UserProvider } from './UI/ContextManager'; // Correct import of UserProvider
import 'bootstrap/dist/css/bootstrap.min.css';
import '@blueprintjs/core/lib/css/blueprint.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>  {/* Wrap App with UserProvider */}
      <FilterProvider>  {/* Wrap App with FilterProvider */}
        <App />
      </FilterProvider>
    </UserProvider>
  </React.StrictMode>
);

reportWebVitals();
