import axios, { AxiosError, type AxiosResponse } from "axios";

/**    
 * Global Axios instance configuration
 * Centralizes API base URL and common parameters
*/

const API_BASE_URL = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : 'http://127.0.0.1:3001/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000, // 10 seconds timeout
    headers: {
        'Content-Type': 'application/json'
    }
});

/**
 * Request Interceptor
 * Automatically injects the API key into every request to avoid repetion.
 */

api.interceptors.response.use(
    (response: AxiosResponse) => {
    return response;
   },
   (error: AxiosError) => {
        console.error('API Error:', error.message);
        return Promise.reject(error);
   }
);

export default api;