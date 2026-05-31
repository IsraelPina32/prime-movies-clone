import axios, { type AxiosResponse } from "axios";

/**
 * Global Axios instance configuration.
 * - Local dev: http://localhost:3001/api (or VITE_API_URL)
 * - Production (split repos): VITE_API_URL must point to the backend deployment
 * - Production (monorepo on Vercel): falls back to same-origin /api
 */

function resolveApiBaseUrl(): string {
  const backendUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, '');

  if (backendUrl) {
    return `${backendUrl}/api`;
  }

  if (import.meta.env.DEV) {
    return 'http://localhost:3001/api';
  }

  return '/api';
}

const API_BASE_URL = resolveApiBaseUrl();

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
   (error) => {
        console.error('API Error:', error.message || error);
        return Promise.reject(error);
   }
);

export default api;