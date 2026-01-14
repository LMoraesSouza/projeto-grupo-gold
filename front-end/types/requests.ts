import { AppointmentStatus, UserRole } from './enums';

//autenticação
export interface LoginRequest {
    email: string;
    password: string;
    role: UserRole;
}

//usuarios
export interface RegisterRequest {
    name: string;
    email: string;
    role: UserRole;
    password: string;
}

export interface UpdateUserRequest {
    name?: string;
    email?: string;
    role?: UserRole;
    password?: string;
}

//salas
export interface CreateRoomRequest {
    name: string;
    description?: string;
}

export interface UpdateRoomRequest {
    name?: string;
    description?: string;
}

//agendamentos
export interface CreateAppointmentRequest {
    userId: number;
    roomId: number;
    title: string;
    description?: string;
    startDateTime: string;
    endDateTime: string;
    status?: AppointmentStatus;
}

export interface UpdateAppointmentRequest {
    title?: string;
    description?: string;
    startDateTime?: string;
    endDateTime?: string;
    status?: AppointmentStatus;
    roomId?: number;
}

// Filtros
export interface PaginationParams {
    page?: number;
    limit?: number;
}

export interface DateRangeParams {
    startDate?: string;
    endDate?: string;
}

export interface AppointmentFilters extends PaginationParams, DateRangeParams {
    userId?: number;
    roomId?: number;
    status?: AppointmentStatus;
}

export interface RoomAvailabilityParams {
    startDateTime: string;
    endDateTime: string;
}

// Tipos genéricos para queries
export interface ListParams<TFilters = unknown> extends PaginationParams {
    filters?: TFilters;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}