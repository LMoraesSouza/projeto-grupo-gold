import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/database';
import setupAssociations from './models/associations';
import userRoutes from './routes/userRoutes';
import roomRoutes from './routes/roomRoutes';
import authRoutes from './routes/authRoutes';
import appointmentRoutes from './routes/appointmentsRoutes';
import permissionRoutes from './routes/permissionRoutes';
import logRoutes from './routes/logRoutes';
import User from './models/User';
import Room from './models/Room';
import Appointment from './models/Appointment';

import './models/User';
import './models/Permission';
import './models/Appointment';
import Log from './models/Log';

setupAssociations();

const mock = require('../mock.js')

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/permissions', permissionRoutes);
app.use('/api/logs', logRoutes);

app.get('/api', (req: Request, res: Response) => {
    res.json({
        message: 'Welcome to the API',
        version: '1.0.0',
        endpoints: {
            users: '/api/users',
            health: '/health'
        }
    });
});

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
        success: false,
        error: 'Route not found',
        path: req.originalUrl,
        method: req.method
    });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('Error:', err);
    res.status(500).json({
        success: false,
        error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
});

// Test db connection
const testConnection = async (): Promise<void> => {
    try {
        console.log('Database connection established successfully.');
        await sequelize.authenticate();
        if (process.env.NODE_ENV === 'development') {
            await sequelize.sync({ alter: true });
            console.log('Database synced.');
        }
        // console.log(mock.appointments)

        // if (mock) {
        //     console.log(mock.logs)
        //     mock.logs.map(async (log: any) => {
        //         await Log.create(log);
        //     })
        // }

    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

export { app, testConnection };