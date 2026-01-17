import { Router } from 'express';
import { createAppointment, getAllAppointments, getClientAppointments, updateAppointmentStatus } from '../controllers/appointmentController';
import { authenticate } from '../middlewares/authMiddleware';
import { body, param } from 'express-validator';

const router = Router();

const getUserAppointmentsValidation = [
    param('userId').trim().notEmpty().withMessage('User is required'),
]

const createAppointmentValidation = [
    body('userId').trim().notEmpty().withMessage('User is required'),
    body('dateTime').trim().notEmpty().withMessage('Date is required'),
    body('roomId').notEmpty().withMessage('Room is required'),
];

const updateAppointment = [
    param('id').trim().notEmpty().withMessage('Id is required'),
];

// todas rotas protegidas
router.get('/', authenticate, getAllAppointments);
router.get('/:userId', authenticate, getUserAppointmentsValidation, getClientAppointments);
router.post('/', authenticate, createAppointmentValidation, createAppointment);
router.put('/:id', authenticate, updateAppointment, updateAppointmentStatus);

export default router;