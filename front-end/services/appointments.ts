import api from './api';
import { Appointment } from '../types/entities';
import { UpdateAppointmentRequest, CreateAppointmentRequest } from '@/types/requests';

export interface CreateappointmentData extends Appointment {
    password: string;
}

// Funções de usuários
export const getAllAppointments = async (): Promise<Appointment[]> => {
    const response = await api.get<Appointment[]>('/appointments');
    return [...response.data];
};

export const getClientAppointments = async (id: number): Promise<Appointment[]> => {
    const response = await api.get<Appointment[]>(`/appointments/${id}`);
    return [...response.data];
};

export const createAppointment = async (appointmentData: CreateAppointmentRequest): Promise<Appointment> => {
    const response = await api.post<Appointment>('/appointments', appointmentData);
    return response.data;
};

export const updateAppointment = async (id: number, appointmentData: UpdateAppointmentRequest): Promise<Appointment> => {
    const response = await api.put<Appointment>(`/appointments/${id}`, appointmentData);
    return response.data;
};

export const deleteAppointment = async (id: number): Promise<void> => {
    await api.delete(`/appointments/${id}`);
};

// Exportar todas as funções
export const appointmentsService = {
    getAll: getAllAppointments,
    getByClient: getClientAppointments,
    create: createAppointment,
    update: updateAppointment,
    delete: deleteAppointment,
};