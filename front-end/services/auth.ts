import { LoginRequest, RegisterRequest } from '@/types/requests';
import api, { setAuthToken, removeAuthToken, getAuthToken } from './api';
import { User } from '@/types/entities';
import { EntityResponse } from '@/types/responses';

export interface AuthResponse {
    success: boolean;
    token: string;
    user: User;
    message?: string;
}

export const login = async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', credentials);

    if (response.data.success && response.data.token) {
        setAuthToken(response.data.token);
    }

    return response.data;
};

export const register = async (userData: RegisterRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', userData);

    if (response.data.success && response.data.token) {
        setAuthToken(response.data.token);
    }

    return response.data;
};

export const logout = async (): Promise<void> => {
    try {
        await api.post('/auth/logout');
    } catch (error) {
        console.log('Logout API error (ignored):', error);
    } finally {
        removeAuthToken();
    }
};

export const getCurrentUser = async (): Promise<User> => {
    const response = await api.get<EntityResponse<'user'>>('/auth/profile');

    return response.data.user;
};

export const isAuthenticated = (): boolean => {
    return !!getAuthToken();
};

export const validateToken = async (): Promise<boolean> => {
    try {
        await api.get('/auth/validate');
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};

const authService = {
    login,
    register,
    logout,
    getCurrentUser,
    isAuthenticated,
    validateToken,
    setAuthToken,
    removeAuthToken,
    getAuthToken,
};

export default authService;