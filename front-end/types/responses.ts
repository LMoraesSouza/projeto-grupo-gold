import { User, Room, Appointment } from './entities';

export interface ApiResponse<T = unknown> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
}

export interface PaginatedResponse<T = unknown> extends ApiResponse<T[]> {
    count: number;
    totalPages: number;
    currentPage: number;
    hasNext: boolean;
    hasPrev: boolean;
}

export interface AuthResponse {
    token: string;
    user: User;
}

export type LoginResponse = ApiResponse<AuthResponse>;
export type RegisterResponse = ApiResponse<AuthResponse>;
export type UserResponse = ApiResponse<User>;
export type UsersResponse = PaginatedResponse<User>;
export type RoomResponse = ApiResponse<Room>;
export type RoomsResponse = ApiResponse<Room[]>;
export type AppointmentResponse = ApiResponse<Appointment>;
export type AppointmentsResponse = PaginatedResponse<Appointment>;