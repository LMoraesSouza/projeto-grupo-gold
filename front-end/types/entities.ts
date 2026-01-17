import { UserRole, AppointmentStatus } from "./enums";

export interface BaseEntity {
    id: number;
    createdAt: string;
    updatedAt?: string;
}

export interface User extends BaseEntity {
    name: string;
    email: string;
    role: UserRole;
    lastName: string;
    address: string;
    number: string;
    district: string;
    city: string;
    zipCode: string;
    state: string;
    isActive: boolean;
    permissions: Permission[];
}

export interface Permission extends BaseEntity {
    id: number;
    access: string;
    userId: number;
    isActive: boolean;
}

export interface Room extends BaseEntity {
    name: string;
    description: string;
}

export interface Appointment extends BaseEntity {
    userId: number;
    roomId: number;
    dateTime: Date;
    status: AppointmentStatus;

    // Relacionamentos
    user?: Pick<User, 'id' | 'name' | 'email' | 'role' | 'lastName'>;
    room?: Pick<Room, 'id' | 'name' | 'description'>;
}
