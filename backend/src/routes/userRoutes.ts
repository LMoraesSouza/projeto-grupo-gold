import { Router } from 'express';
import { getAllUsers } from '../controllers/userController';
import { authenticate } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', authenticate, getAllUsers);

export default router;