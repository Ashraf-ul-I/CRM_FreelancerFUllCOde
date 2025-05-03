import { Request, Response, NextFunction } from "express";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getDashboardStats = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user.userId;
  
      // Total clients
      const totalClients = await prisma.client.count({ where: { userId } });
  
      // Total projects
      const totalProjects = await prisma.project.count({
        where: { client: { userId } }
      });
  
      // Reminders due soon (this week)
      const today = new Date();
      const endOfWeek = new Date(today);
      endOfWeek.setDate(today.getDate() + (7 - today.getDay()));
      const remindersDueSoon = await prisma.reminder.count({
        where: {
          client: { userId },
          dueDate: { gte: today, lte: endOfWeek }
        }
      });
  
      // Projects by status
      const projectsByStatus = await prisma.project.groupBy({
        by: ['status'],
        where: { client: { userId } },
        _count: { status: true }
      });
  
      const pendingProjects = await prisma.project.findMany({
        where: {
          status: "pending",
          client: { userId }
        },
        select: {
          id: true,
          title: true
        }
      });
  
      res.json({
        success: true,
        data: {
          totalClients,
          totalProjects,
          remindersDueSoon,
          projectsByStatus: projectsByStatus.map(s => ({
            status: s.status,
            count: s._count.status
          })),
          pendingProjects // <-- here!
        }
      });
    } catch (error) {
      next(error);
    }
  };