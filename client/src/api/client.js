import axios from 'axios';

function resolveApiBaseUrl() {
  const configured = (import.meta.env.VITE_API_URL || '').trim();
  if (!configured) return 'http://localhost:5000/api';
  return /\/api\/?$/.test(configured) ? configured.replace(/\/$/, '') : `${configured.replace(/\/$/, '')}/api`;
}

const api = axios.create({
  baseURL: resolveApiBaseUrl(),
  timeout: 30_000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error?.response?.data?.message ? error : new Error('Network error. Please try again.'))
);

export default api;
