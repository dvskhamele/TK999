import React from 'react';

const TestApp: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Test App</h1>
        <p className="text-gray-600">If you can see this, React is working!</p>
      </div>
    </div>
  );
};

export default TestApp;