import express from 'express';
import {authenticate} from '../middlewares/auth.middleware'
import { deleteClientData, getClient, getClientData, newClient, updateClientData } from '../controllers/client.controller';
const router = express.Router();

router.post('/register-client',authenticate,newClient);
router.patch('/update-client/:clientId',authenticate,updateClientData);
router.delete('/delete-client/:clientId',authenticate,deleteClientData);
router.get('/get-client',authenticate,getClient)
router.get('/get-client/:clientId',authenticate,getClientData)
export default router;
