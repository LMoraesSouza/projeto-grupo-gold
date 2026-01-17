import { Router } from 'express';
import { getAllUsers, getUserById, updateUser } from '../controllers/userController';
import { authenticate } from '../middlewares/authMiddleware';
import { body, param } from 'express-validator';

const router = Router();

const updateUserValidator = [
    body('isActive').notEmpty().withMessage('isActive is required'),
    param('id').notEmpty().withMessage('User id is required')
];

router.get('/', authenticate, getAllUsers);
router.get('/:id', authenticate, getUserById);
router.put('/:id', authenticate, updateUserValidator, updateUser);

export default router;