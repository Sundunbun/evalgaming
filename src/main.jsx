// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client'; // Corrected import for React 18
import App from './App';
import './index.css'; // Ensure global styles are applied

// Create root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app inside the root element
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
