// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { FilterProvider } from './UI/ContextManager'; // Import FilterProvider
import 'bootstrap/dist/css/bootstrap.min.css';
import '@blueprintjs/core/lib/css/blueprint.css';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FilterProvider>  {/* Wrap App with FilterProvider */}
      <App />
    </FilterProvider>
  </React.StrictMode>
);

reportWebVitals();
