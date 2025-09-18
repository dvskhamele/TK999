// Utility to get the base URL for API calls
// In development, we use the proxy (relative path)
// In production, we need the full URL to the backend

const getApiBaseUrl = () => {
  // Check if we're in development mode
  if (import.meta.env.DEV) {
    // In development, we use the proxy set up in vite.config.ts
    return '';
  }
  
  // In production, you need to set the VITE_API_BASE_URL environment variable
  // This should be the URL of your deployed backend
  return import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001';
};

export const API_BASE_URL = getApiBaseUrl();

// Helper function to make API calls
export const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  
  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };
  
  try {
    const response = await fetch(url, mergedOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};