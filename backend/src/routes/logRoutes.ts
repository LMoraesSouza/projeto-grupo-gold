import { Router } from 'express';
import { getAllLogs, getLogByUser } from '../controllers/logController';
import { authenticate } from '../middlewares/authMiddleware';
import { param } from 'express-validator';

const router = Router();

const getLogByUserValidator = [
    param('userId').notEmpty().withMessage('User id is required')
];

router.get('/', authenticate, getAllLogs);
router.get('/:userId', authenticate, getLogByUserValidator, getLogByUser);

export default router;