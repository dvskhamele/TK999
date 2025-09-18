import React from 'react';
import ReactDOM from 'react-dom/client';
import InlineTestApp from './InlineTestApp';

console.log('main.tsx is running');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <InlineTestApp />
  </React.StrictMode>,
);

console.log('InlineTestApp component mounted');