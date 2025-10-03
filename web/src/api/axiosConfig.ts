import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://1e788b17c486.ngrok-free.app',
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- NEW: Add an interceptor to include the token ---
apiClient.interceptors.request.use(
  (config) => {
    // Get the token from localStorage
    const token = localStorage.getItem('accessToken');
    if (token) {
      // If the token exists, add it to the Authorization header
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle any errors
    return Promise.reject(error);
  }
);
// ---------------------------------------------------

export default apiClient;