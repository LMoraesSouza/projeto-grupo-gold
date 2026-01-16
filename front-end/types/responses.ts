import { User, Room, Appointment } from './entities';


export type EntityMap = {
    user: User;
    room: Room;
    appointment: Appointment;
};

export type EntityName = keyof EntityMap;

export interface ApiResponse<T = unknown> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
}

export type EntityResponse<T extends EntityName> = {
    success: boolean;
} & Record<T, EntityMap[T]>;

export type ApiEntityResponse<T extends EntityName> =
    ApiResponse<EntityResponse<T>>;

export type EntityListResponse<T extends EntityName> = {
    success: boolean;
    items: EntityMap[T][];
    count: number;
    totalPages?: number;
    currentPage?: number;
};

export type ApiEntityListResponse<T extends EntityName> = ApiResponse<EntityListResponse<T>>;

