import { Router } from 'express';
import { getAllRooms } from '../controllers/roomController';
import { authenticate } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', authenticate, getAllRooms);

export default router;