import express from 'express'
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from './generated/prisma';
import authRoutes from './routes/authRoutes.routes'; 
import clientRoutes from './routes/client.routes'
import projectRoutes from './routes/project.routes'
import interactionLogRoutes from './routes/interactionLogs.routes'
import reminderRoutes from "./routes/reminder.routes"
import dashboardRoutes from './routes/dashboard.routes'
import { errorHandler } from './middlewares/errorHandler';
import cookieParser from 'cookie-parser';


dotenv.config();
const app=express();
const prisma=new PrismaClient();
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const allowedOrigins = ['http://localhost:5173']; 
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow cookies to be sent
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Allow only necessary methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Limit allowed headers
}));
app.use(express.json());

app.use('/api/auth',authRoutes);
app.use('/api/client',clientRoutes);
app.use('/api/project',projectRoutes);
app.use('/api/interaction-logs',interactionLogRoutes);
app.use('/api/reminder',reminderRoutes);
app.use('/api/dashboard',dashboardRoutes);
app.use(errorHandler);

const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server is Running on ${PORT}`)
})
