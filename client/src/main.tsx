import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Import the main CSS file

console.log('main.tsx is running');

// Simple test to verify JavaScript is working
const rootElement = document.getElementById('root');
if (rootElement) {
  console.log('Root element found, attempting to render...');
  
  // Try to render a simple element first
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <div>
      <h1>Hello from React!</h1>
      <p>If you can see this, React is working.</p>
    </div>
  );
  
  console.log('Render attempt completed');
} else {
  console.error('Root element not found!');
}

console.log('main.tsx execution completed');