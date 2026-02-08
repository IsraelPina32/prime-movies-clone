import axios from "axios";

/**    
 * Global Axios instance configuration
 * Centralizes API base URL and common parameters
*/

const api = axios.create({
    baseURL: 'http://localhost:3001/api',
    timeout: 10000, // 10 seconds timeout
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