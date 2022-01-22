import express from 'express';
import { authM } from '../middleware/auth';

const router = express.Router();

// Public Routes
router.post('/signup', authM.signup);
router.post('/login', authM.login);

export default router;
