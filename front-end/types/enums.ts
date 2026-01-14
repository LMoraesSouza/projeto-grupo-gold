export const APPOINTMENT_STATUS = {
    SCHEDULED: 'scheduled',
    CONFIRMED: 'confirmed',
    CANCELED: 'canceled',
    COMPLETED: 'completed',
};

export type AppointmentStatus = typeof APPOINTMENT_STATUS[keyof typeof APPOINTMENT_STATUS];

export const USER_ROLES = {
    USER: 'user',
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

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];