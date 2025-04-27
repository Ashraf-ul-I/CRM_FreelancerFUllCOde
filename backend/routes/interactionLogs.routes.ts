import express from 'express';
import {authenticate} from '../middlewares/auth.middleware'
import { createInteractionLogs, getInteractionLogs } from '../controllers/InteractionLogs.controller';
const router = express.Router();

router.post('/create-interaction/:projectId',authenticate,createInteractionLogs);
router.get('/get-interactionLogs/:projectId',authenticate,getInteractionLogs);

export default router;
