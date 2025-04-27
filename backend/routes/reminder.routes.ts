import express from 'express';
import {authenticate} from '../middlewares/auth.middleware'
import { createReminder, getRemindersForProject, getRemindersThisWeek } from '../controllers/reminder.controller';
import { get } from 'http';
const router = express.Router();

router.post('/add/:projectId',authenticate,createReminder);
router.get('/get-reminder',authenticate,getRemindersThisWeek);
router.get('/project/:projectId', authenticate, getRemindersForProject);
export default router;
