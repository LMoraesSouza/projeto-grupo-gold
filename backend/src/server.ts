import { app, testConnection } from './app';

const PORT = process.env.PORT || 3000;

testConnection();

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown
// process.on('SIGTERM', () => {
//     console.log('SIGTERM signal received: closing HTTP server');
//     server.close(() => {
//         console.log('HTTP server closed');
//     });
// });

export default server;