import express from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import { getDashboardStats } from '../controllers/dashboard.controller';

const router = express.Router();

router.get('/overview', authenticate, getDashboardStats);

export default router;