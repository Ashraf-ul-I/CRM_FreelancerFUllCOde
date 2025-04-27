import { NextFunction, Request, Response } from 'express';
import { PrismaClient } from '../generated/prisma';
import { AppError } from '../utils/AppError';
import { endOfWeek, startOfToday } from 'date-fns';

const prisma = new PrismaClient();

export const createReminder = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const userId = (req as any).user.userId;
    const { projectId } = req.params;
    const { dueDate, message } = req.body;

    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: { client: true }
    });

    if (!project) {
      return next(new AppError('Project not found', 404));
    }

    if (project.client?.userId !== userId) {
      return next(new AppError('Unauthorized access to this project', 403));
    }

    const reminder = await prisma.reminder.create({
      data: {
        dueDate: new Date(dueDate),
        message,
        projectId: project.id,
        clientId: project.client.id
      }
    });

    res.status(201).json({
      success: true,
      message: 'Reminder created successfully',
      reminder
    });

  } catch (error) {
    next(error);
  }
};

export const getRemindersThisWeek = async (req: Request, res: Response, next: NextFunction): Promise<any> =>{
   try {
     const userId= (req as any).user.userId;
     const start= startOfToday();
     const end=endOfWeek(new Date());
     console.log(userId,start,end);
     const reminders = await prisma.reminder.findMany({
        where: {
          dueDate: {
            gte: start,
            lte: end
          },
          client: {
            userId:userId
          }
        },
        orderBy: {
          dueDate: 'asc'
        }
      });
    
      res.status(200).json({
        success: true,
        message:"reminder data get succesfully",
        reminders
      });
   } catch (error) {
     next(error);
   }  
}

export const getRemindersForProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.userId;
    const { projectId } = req.params;
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: { client: true }
    });
    if (!project) return next(new AppError('Project not found', 404));
    if (project.client.userId !== userId) return next(new AppError('Unauthorized', 403));

    const reminders = await prisma.reminder.findMany({
      where: { projectId },
      orderBy: { dueDate: 'asc' }
    });

    res.status(200).json({ success: true, reminders });
  } catch (error) {
    next(error);
  }
};