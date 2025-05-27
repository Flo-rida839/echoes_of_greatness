import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import ErrorBoundary from './components/ErrorBoundary';

// JavaScript version (use this if NOT using TypeScript)
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Failed to find the root element');
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    {/* <ErrorBoundary> */}
      <Router>
        <App />
      </Router>
    {/* </ErrorBoundary> */}
  </React.StrictMode>
);

// Using console logging for web vitals (recommended for development)
reportWebVitals(console.log);