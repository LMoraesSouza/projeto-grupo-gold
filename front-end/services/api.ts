import axios from 'axios';
import Cookies from 'js-cookie';

// URL base do backend
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3030/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

// token de autenticação
api.interceptors.request.use(
    (config) => {
        const token = Cookies.get('token');
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const setAuthToken = (token: string) => {
    Cookies.set('token', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const removeAuthToken = () => {
    Cookies.remove('token');
    delete api.defaults.headers.common['Authorization'];
};

export const getAuthToken = () => {
    return Cookies.get('token');
};

export default api;