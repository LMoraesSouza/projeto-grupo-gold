const users = [
    {
        name: 'Camila',
        lastName: 'Mendes',
        email: 'camila.mendes@goldspell.com.br',
        password: '123123',
        role: 'client',
        isActive: true,
        zipCode: '03333-050',
        address: 'Rua Coronel irineu de Castro',
        number: '43',
        complement: 'Sala 1302',
        district: 'Jardim Anália Franco',
        city: 'São Paulo',
        state: 'São Paulo'
    }, {
        name: 'Beatriz',
        lastName: 'Costa',
        email: 'beatriz.costa@goldspell.com.br',
        password: '123123',
        role: 'client',
        isActive: true,
        zipCode: '03333-050',
        address: 'Rua Coronel irineu de Castro',
        number: '43',
        complement: 'Sala 1302',
        district: 'Jardim Anália Franco',
        city: 'São Paulo',
        state: 'São Paulo'
    }, {
        name: 'Joana',
        lastName: 'Barbosa',
        email: 'joana.barbos@goldspell.com.br',
        password: '123123',
        role: 'client',
        isActive: true,
        zipCode: '03333-050',
        address: 'Rua Coronel irineu de Castro',
        number: '43',
        complement: 'Sala 1302',
        district: 'Jardim Anália Franco',
        city: 'São Paulo',
        state: 'São Paulo'
    }, {
        name: 'Lucas',
        lastName: 'Alex',
        email: 'lucas.alex@goldspell.com.br',
        password: '123123',
        role: 'client',
        isActive: true,
        zipCode: '03333-050',
        address: 'Rua Coronel irineu de Castro',
        number: '43',
        complement: 'Sala 1302',
        district: 'Jardim Anália Franco',
        city: 'São Paulo',
        state: 'São Paulo'
    }, {
        name: 'Lucas',
        lastName: 'Coutinho',
        email: 'lucas.coutinho@goldspell.com.br',
        password: '123123',
        role: 'client',
        isActive: true,
        zipCode: '03333-050',
        address: 'Rua Coronel irineu de Castro',
        number: '43',
        complement: 'Sala 1302',
        district: 'Jardim Anália Franco',
        city: 'São Paulo',
        state: 'São Paulo'
    }, {
        name: 'Anny',
        lastName: 'Cardoso',
        email: 'anny.cardoso@goldspell.com.br',
        password: '123123',
        role: 'client',
        isActive: true,
        zipCode: '03333-050',
        address: 'Rua Coronel irineu de Castro',
        number: '43',
        complement: 'Sala 1302',
        district: 'Jardim Anália Franco',
        city: 'São Paulo',
        state: 'São Paulo'
    },

]

const appointments = [
    {
        userId: 4,
        dateTime: '2025-01-22 16:00:00',
        roomId: 1,
        status: 'scheduled'
    },
    {
        userId: 5,
        dateTime: '2025-01-22 16:00:00',
        roomId: 1,
        status: 'scheduled'
    },
    {
        userId: 6,
        dateTime: '2025-01-22 16:00:00',
        roomId: 1,
        status: 'scheduled'
    },
    {
        userId: 8,
        dateTime: '2025-01-22 16:00:00',
        roomId: 1,
        status: 'scheduled'
    },
    {
        userId: 8,
        dateTime: '2025-01-22 16:00:00',
        roomId: 1,
        status: 'scheduled'
    },
    {
        userId: 4,
        dateTime: '2025-01-22 16:00:00',
        roomId: 1,
        status: 'scheduled'
    },
    {
        userId: 7,
        dateTime: '2025-01-22 16:00:00',
        roomId: 1,
        status: 'scheduled'
    },
    {
        userId: 9,
        dateTime: '2025-01-22 16:00:00',
        roomId: 1,
        status: 'scheduled'
    }, {
        userId: 9,
        dateTime: '2025-01-22 16:00:00',
        roomId: 1,
        status: 'scheduled'
    }, {
        userId: 9,
        dateTime: '2025-01-22 16:00:00',
        roomId: 1,
        status: 'scheduled'
    }, {
        userId: 9,
        dateTime: '2025-01-22 16:00:00',
        roomId: 1,
        status: 'scheduled'
    },

]

const logs = [
    {
        userId: 4,
        activityDescription: 'Criação de agendamento',
        module: 'appointments',
    },
    {
        userId: 5,
        activityDescription: 'Login',
        module: 'my account',
    },
    {
        userId: 6,
        activityDescription: 'Logout',
        module: 'my account',
    },
    {
        userId: 8,
        activityDescription: 'Cancelamento de agendamento',
        module: 'appointments',
    },
    {
        userId: 8,
        activityDescription: 'Atualização de cadastro',
        module: 'my account',
    },
    {
        userId: 4,
        activityDescription: 'Cancelamento de agendamento',
        module: 'appointments',
    },
    {
        userId: 7,
        activityDescription: 'Cancelamento de agendamento',
        module: 'appointments',
    },
    {
        userId: 9,
        activityDescription: 'Criação de agendamento',
        module: 'appointments',
    },
    {
        userId: 9,
        activityDescription: 'Criação de agendamento',
        module: 'appointments',
    },
    {
        userId: 9,
        activityDescription: 'Criação de agendamento',
        module: 'appointments',
    },
    {
        userId: 9,
        activityDescription: 'Atualização de cadastro',
        module: 'my account',
    },
]

module.exports = {
    users,
    appointments,
    logs
};