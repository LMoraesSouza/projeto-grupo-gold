import api from './api';
import { Log } from '../types/entities';

// Funções de usuários
export const getAllLogs = async (): Promise<Log[]> => {
    const response = await api.get<Log[]>('/logs');
    return response.data;
};

export const getLogByUser = async (id: number): Promise<Log[]> => {
    const response = await api.get<Log[]>(`/logs/${id}`);
    return response.data;
};

// Exportar todas as funções
export const logsService = {
    getAll: getAllLogs,
    getById: getLogByUser,
};