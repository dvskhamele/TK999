import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';

// Simple test component
const TestComponent = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#333', fontSize: '2rem', marginBottom: '1rem' }}>TK999 React App</h1>
      <p style={{ color: '#666', fontSize: '1.2rem', marginBottom: '2rem' }}>
        If you can see this, the React app is working!
      </p>
      <div style={{ backgroundColor: '#f0f8ff', padding: '20px', borderRadius: '10px', maxWidth: '600px', margin: '0 auto' }}>
        <h2 style={{ color: '#4a90e2', marginBottom: '1rem' }}>Application Status</h2>
        <ul style={{ textAlign: 'left', display: 'inline-block' }}>
          <li style={{ marginBottom: '0.5rem' }}>✅ React is running</li>
          <li style={{ marginBottom: '0.5rem' }}>✅ Router is working</li>
          <li style={{ marginBottom: '0.5rem' }}>✅ CSS is loading</li>
          <li style={{ marginBottom: '0.5rem' }}>✅ Bundle is executing</li>
        </ul>
      </div>
    </div>
  );
};

// Main App component
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TestComponent />} />
        <Route path="/test" element={<TestComponent />} />
      </Routes>
    </Router>
  );
};

// Render the app
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}