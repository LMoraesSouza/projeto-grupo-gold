import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/database';
import userRoutes from './routes/userRoutes';
import roomRoutes from './routes/roomRoutes';
import authRoutes from './routes/authRoutes';

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/auth', authRoutes);

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

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('Error:', err);
    res.status(500).json({
        success: false,
        error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
});

// Test database connection
const testConnection = async (): Promise<void> => {
    try {
        await sequelize.authenticate();
        console.log('Database connection established successfully.');
        if (process.env.NODE_ENV === 'development') {
            await sequelize.sync({ alter: true });
            console.log('Database synced.');
        }

    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

export { app, testConnection };