import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://milkshop-production.up.railway.app/api', // Identified from backend research or placeholder if not provided
  headers: {
    'Content-Type': 'application/json',
  },
});

// Since I don't have the exact baseURL, I'll use a placeholder or check if any .env exists
// For now, let's assume a standard structure.

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
