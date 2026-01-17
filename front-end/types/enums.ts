export const APPOINTMENT_STATUS = {
    PENDING: 'pending',
    SCHEDULED: 'scheduled',
    CANCELED: 'canceled',
    COMPLETED: 'completed',
};

export type AppointmentStatus = keyof typeof APPOINTMENT_STATUS;

export const USER_ROLES = {
    CLIENT: 'client',
    ADMIN: 'admin',
};

export const ROUTES = {
    LOGIN: '/login',
    REGISTER: '/register',
    DASHBOARD: '/agendamentos',
    LOGS: '/logs',
    MY_ACCOUNT: '/minha-conta',
    CLIENTS: '/admin/clientes',
    ADMIN_LOGIN: '/admin/login',
    ADMIN_DASHBOARD: '/admin/agendamentos',
    ADMIN_LOGS: '/admin/logs',
}

export type UserRole = keyof typeof USER_ROLES;