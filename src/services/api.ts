import axios from "axios";

/**    
 * Global Axios instance configuration
 * Centralizes API base URL and common parameters
*/

const api = axios.create({
    baseURL: 'https://www.omdbapi.com/',
    timeout: 10000, // 10 seconds timeout
});

/**
 * Request Interceptor
 * Automatically injects the API key into every request to avoid repetion.
 */

api.interceptors.request.use((config) => {

    const apiKey = import.meta.env.VITE_OMDB_API_KEY;

    if(!apiKey) {
        console.log('API key is missing! check your .env.local file.');
        
    }
    config.params = {
        ...config.params,
        apikey: apiKey,
    };
    return config;
});

export default api;