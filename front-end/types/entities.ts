import { AppointmentStatus, UserRole } from "./enums";

export interface BaseEntity {
    id: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface User extends BaseEntity {
    name: string;
    email: string;
    role: UserRole;
}

export interface Room extends BaseEntity {
    name: string;
    description: string;
}

export interface Appointment extends BaseEntity {
    userId: number;
    roomId: number;
    title: string;
    description?: string;
    startDateTime: string;
    endDateTime: string;
    status: AppointmentStatus;

    // Relacionamentos
    user?: Pick<User, 'id' | 'name' | 'email'>;
    room?: Pick<Room, 'id' | 'name' | 'description'>;
}
