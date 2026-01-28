// API configuration
// Em produção (ex: Vercel): defina REACT_APP_API_URL com a URL do backend (ex: https://seu-backend.vercel.app)
// Se frontend e backend estiverem no mesmo projeto com /api no mesmo domínio, pode ficar vazio e usaremos ''
const getApiBaseUrl = () => {
  if (process.env.REACT_APP_API_URL) return process.env.REACT_APP_API_URL;
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1')
    return ''; // produção sem env: tenta mesmo domínio (útil se /api for rewrite para o backend)
  return 'http://localhost:5000';
};
const API_BASE_URL = getApiBaseUrl();

export const api = {
  baseURL: API_BASE_URL,
  // Helper function to get full API URL
  getUrl: (endpoint) => {
    // Remove leading slash if present to avoid double slashes
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
    return `${API_BASE_URL}/${cleanEndpoint}`;
  }
};

