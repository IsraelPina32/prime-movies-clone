import axios from "axios";

/**    
 * Global Axios instance configuration
 * Centralizes API base URL and common parameters
*/

const API_BASE_URL = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : 'http://localhost:3001/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000, // 10 seconds timeout
    headers: {
        'Content-Type': 'aplication/json'
    }
});

/**
 * Request Interceptor
 * Automatically injects the API key into every request to avoid repetion.
 */

api.interceptors.request.use((response) => response, (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
   }
);

export default api;