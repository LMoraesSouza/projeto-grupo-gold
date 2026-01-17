import { Router } from 'express';
import { getAllPermissions, getPermisionByUser, updatePermission, createPermission } from '../controllers/permissionController';
import { authenticate } from '../middlewares/authMiddleware';
import { body, param } from 'express-validator';

const router = Router();

const getPermissionByUserValidator = [
    param('userId').trim().notEmpty().withMessage('User id is required'),
];

const updtatePermissionValidator = [
    param('id').trim().notEmpty().withMessage('User id is required'),
    body('isActive').trim().notEmpty().withMessage('isActive is required'),
];

const createPermissionValidator = [
    body('userId').trim().notEmpty().withMessage('User id is required'),
    body('access').trim().notEmpty().withMessage('Access id is required'),
    body('isActive').trim().notEmpty().withMessage('isActive is required'),
];

router.get('/', authenticate, getAllPermissions);
router.get('/:userId', authenticate, getPermissionByUserValidator, getPermisionByUser);
router.put('/:id', authenticate, updtatePermissionValidator, updatePermission);
router.post('/', authenticate, createPermissionValidator, createPermission);

export default router;