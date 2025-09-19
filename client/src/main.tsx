import React from 'react';
import ReactDOM from 'react-dom/client';
import TestApp from './TestApp';
import './index.css'; // Import the main CSS file

console.log('main.tsx is running');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TestApp />
  </React.StrictMode>,
);

console.log('TestApp component mounted');