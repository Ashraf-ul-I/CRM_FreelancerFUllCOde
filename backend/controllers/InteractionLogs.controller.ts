import { NextFunction, Request, Response } from 'express';
import { PrismaClient } from '../generated/prisma';
import { AppError } from '../utils/AppError';
const prisma = new PrismaClient();

export const createInteractionLogs=async (req:Request,res:Response,next:NextFunction):Promise<any> =>{
    try {
        const userId=(req as any).user.userId;
        const {projectId}=req.params;
        const {date,interactionType,notes}=req.body;
        const project= await prisma.project.findUnique({
             where:{
               id:projectId
             },
             include:{
                client:true
             }
        });
        if (!project) {
            return next(new AppError('Project not found', 404));
          }
          
        if (project.client.userId !== userId) {
          return next(new AppError('You do not have permission to interact with this project', 403));
        }

        const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      throw new AppError("Invalid date provided for date", 400); 
    }

        const createLogs=await prisma.interactionLog.create({
            data:{
                projectId:projectId,
                clientId:project.client.id,
                date: parsedDate,         
                interactionType,
                notes          
            }
        });

        res.status(200).json({success:true,message:"Logs created Successfully",interactionLogs:createLogs})

    } catch (error) {
        next(error);
    }
};

export const getInteractionLogs = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const userId = (req as any).user.userId;
      const { projectId } = req.params;
      const project = await prisma.project.findUnique({
        where: {
          id: projectId
        },
        include: {
          client: true
        }
      });
  
      if (!project) {
        return next(new AppError('Project not found', 404));
      }
  
      if (project.client.userId !== userId) {
        return next(new AppError('You do not have permission to view logs for this project', 403));
      }
  
      // Fetch all interaction logs for this project
      const logs = await prisma.interactionLog.findMany({
        where: {
          projectId: projectId,
          clientId: project.client.id
        },
        orderBy: {
          date: 'desc'
        }
      });
  
      res.status(200).json({
        success: true,
        logs
      });
  
    } catch (error) {
      next(error);
    }
  };
  