import { Router } from 'express';
import { body } from 'express-validator';
import {
    register,
    login,
    logout,
    getProfile,
    updateProfile,
    changePassword
} from '../controllers/authController';
import { authenticate } from '../middlewares/authMiddleware';

const router = Router();

// validações
const registerValidation = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

const loginValidation = [
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
    body('role').notEmpty().withMessage('Role is required')
];

const changePasswordValidation = [
    body('currentPassword').notEmpty().withMessage('Current password is required'),
    body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters')
];

// publicas
router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);

// protegidas
router.post('/logout', authenticate, logout);
router.get('/profile', authenticate, getProfile);
router.put('/profile', authenticate, updateProfile);
router.put('/change-password', authenticate, changePasswordValidation, changePassword);

export default router;