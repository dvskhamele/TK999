// Utility to get the base URL for API calls
// In development, we use the proxy (relative path)
// In production, we need the full URL to the backend

const getApiBaseUrl = () => {
  // Check if we're in development mode
  if (import.meta.env.DEV) {
    // In development, we use the proxy set up in vite.config.ts
    return '';
  }
  
  // In production, use the environment variable
  // If not set, API calls will fail which is the correct behavior
  return import.meta.env.VITE_API_BASE_URL || '';
};

export const API_BASE_URL = getApiBaseUrl();

// Helper function to make API calls
export const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  // If we don't have a base URL in production, throw an error
  if (!API_BASE_URL && !import.meta.env.DEV) {
    throw new Error('API base URL is not configured. Please set the VITE_API_BASE_URL environment variable.');
  }
  
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

// Export a version number for debugging deployment issues
export const API_UTILS_VERSION = '1.0.1';