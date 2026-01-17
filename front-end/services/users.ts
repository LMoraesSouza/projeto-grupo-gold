import api from './api';
import { User } from '../types/entities';
import { UpdatePermissionRequest, UpdateUserRequest } from '@/types/requests';

export interface CreateUserData extends User {
    password: string;
}

// Funções de usuários
export const getAllUsers = async (): Promise<User[]> => {
    const response = await api.get<User[]>('/users');
    return response.data;
};

export const getUserById = async (id: number): Promise<User> => {
    const response = await api.get<User>(`/users/${id}`);
    return response.data;
};

export const createUser = async (userData: CreateUserData): Promise<User> => {
    const response = await api.post<User>('/users', userData);
    return response.data;
};

export const updateUser = async (id: number, userData: UpdateUserRequest): Promise<User> => {
    const response = await api.put<User>(`/users/${id}`, userData);
    console.log(response)
    return response.data;
};

export const createUserPermission = async (permissionData: UpdatePermissionRequest): Promise<User> => {
    console.log(permissionData)
    const response = await api.post<User>(`/permissions/`, permissionData);
    return response.data;
};

export const updateUserPermissions = async (id: number, permissionData: UpdatePermissionRequest): Promise<User> => {
    const response = await api.put<User>(`/permissions/${id}`, permissionData);
    console.log(response)
    return response.data;
};

export const deleteUser = async (id: number): Promise<void> => {
    await api.delete(`/users/${id}`);
};

export const getMe = async (): Promise<User> => {
    const response = await api.get<User>('/users/me');
    return response.data;
};

// Exportar todas as funções
export const usersService = {
    getAll: getAllUsers,
    getById: getUserById,
    create: createUser,
    update: updateUser,
    delete: deleteUser,
    updatePermissions: updateUserPermissions,
    createPermission: createUserPermission,
    getMe,
};