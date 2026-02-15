// API service layer with axios and Firebase auth token interceptor
import axios from 'axios';
import { auth } from './firebase';

// Create axios instance with base URL from environment variable
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: Add Firebase auth token to every request
api.interceptors.request.use(
  async (config) => {
    try {
      // Get current user and their ID token
      const user = auth.currentUser;
      if (user) {
        const token = await user.getIdToken();
        // Add Authorization header with Bearer token
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error getting Firebase token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor: Handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common HTTP errors
    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.error('Unauthorized: Invalid or expired token');
          break;
        case 403:
          console.error('Forbidden: Access denied');
          break;
        case 404:
          console.error('Not found:', error.response.config.url);
          break;
        case 500:
          console.error('Server error:', error.response.data);
          break;
        default:
          console.error('API error:', error.response.status, error.response.data);
      }
    } else if (error.request) {
      console.error('Network error: No response received');
    } else {
      console.error('Request error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
