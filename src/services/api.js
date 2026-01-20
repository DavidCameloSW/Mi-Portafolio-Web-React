import axios from 'axios';

// URL condicional para desarrollo/producción
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://tu-backend-futuro.com/api'  // Cuando subas el backend
  : 'http://localhost:5000/api';          // Desarrollo (tu PC)

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptor para manejar errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      throw new Error('El servidor tardó demasiado en responder');
    }
    
    if (!error.response) {
      throw new Error('Error de conexión: Verifica tu conexión a internet');
    }
    
    throw error;
  }
);

export const contactAPI = {
  submitContact: (contactData) => api.post('/contact/submit', contactData)
};

export default api;