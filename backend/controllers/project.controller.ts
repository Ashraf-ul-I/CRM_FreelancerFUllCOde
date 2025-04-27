import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "../generated/prisma";
import { AppError } from "../utils/AppError";
const prisma = new PrismaClient();

export const createProject = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { clientId } = req.params;
    console.log("REQ BODY:", req.body);
    const { title, budget, deadline, status } = req.body;
    const client = await prisma.client.findFirst({
      where: {
        id: clientId,
      },
    });
    console.log("Found client:", client); // Check if the client is found
    if (!client) throw new AppError("Client is not found", 404);

    const parsedDeadline = new Date(deadline);
    if (isNaN(parsedDeadline.getTime())) {
      throw new AppError("Invalid date provided for deadline", 400); // Handle invalid date
    }
    const project = await prisma.project.create({
      data: {
        clientId,
        title,
        budget,
        deadline: parsedDeadline,
        status,
      },
    });
    res
      .status(200)
      .json({
        success: true,
        message: "Project created Successfully",
        project: project,
      });
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { projectId } = req.params;
    const { title, budget, clientId, deadline, status } = req.body;
    const userId = (req as any).user.userId;

    const updateData: any = {};
    //for specific data update
    if (title) updateData.title = title;
    if (budget) updateData.budget = budget;
    if (clientId) updateData.clientId = clientId;
    if (deadline) updateData.deadline = new Date(deadline);
    if (status) updateData.status = status;

    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: { client: true },
    });
    if (!project) return next(new AppError("Project not found", 404));

    //checking that the client who owns the project is the user client or not
    if (project.client.userId !== userId) {
      return next(new AppError("Unauthorized to update this project", 403));
    }
    //validate clientId if it's being changed
    if (clientId && clientId !== project.clientId) {
      const client = await prisma.client.findUnique({
        where: { id: clientId },
      });

      if (!client || client.userId !== userId) {
        return next(new AppError("Invalid clientId", 400));
      }
    }

    const updatedProject = await prisma.project.update({
      where: { id: projectId },
      data: updateData,
    });

    res
      .status(200)
      .json({
        success: true,
        message: "Project Data Update Succesfully",
        project: updatedProject,
      });
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const userId = (req as any).user.userId;
    const { projectId } = req.params;
  
    try {
      const result = await prisma.$transaction(async (prisma) => {
    
        const project = await prisma.project.findUnique({
          where: { id: projectId },
          include: { client: true },
        });
  
        if (!project) {
          throw new AppError("Project not found", 404);
        }
  
        // Ensure the user is the owner of the project
        if (project.client.userId !== userId) {
          throw new AppError("You are not authorized to delete this project", 403);
        }
  
        // Delete related interaction logs
        await prisma.interactionLog.deleteMany({
          where: { projectId: projectId },
        });
  
        // Delete the project itself
        await prisma.project.delete({
          where: { id: projectId },
        });
  
        return { success: true, message: "Project and related logs deleted successfully" };
      });
  
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
  

export const getProjectData = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { projectId } = req.params;
    const userId = (req as any).user.userId;
    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
      //we dont need the full client data we just need the userId in client
      //so that we can justify that its a valid owner who want to fetch the data
      include: {
        client: {
          select: {
            userId: true,
          },
        },
      },
    });
    if (!project) {
      return next(new AppError("Project not found", 404));
    }
    if (project.client.userId !== userId) {
      return next(new AppError("Unauthorized access to project data", 403));
    }
    return res.status(200).json({
      success: true,
      message: "Project fetched successfully",
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

export const getProjectByCLientId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const userId = (req as any).user.userId;
    const { clientId } = req.params;

    const client = await prisma.client.findUnique({
      where: {
        id: clientId,
      },
    });

    if (!client) {
      return next(new AppError("Client not found", 404));
    }

    if (client && client.userId !== userId) {
      return next(new AppError("Unauthorized access to this client", 403));
    }

    const projects = await prisma.project.findMany({
      where: {
        clientId: clientId,
      },
    });
    if (!projects) {
      return next(new AppError("Project not found", 404));
    }
    return res.status(200).json({
      success: true,
      message: "Project fetched successfully",
      data: projects,
    });
  } catch (error) {
    next(error);
  }
};

export const getProject = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const userId = (req as any).user.userId;
    const projects = await prisma.project.findMany({
      where: {
        client: {
          userId: userId,
        },
      },
    });
    if (!projects) {
      return next(new AppError("Project not found", 404));
    }
    return res.status(200).json({
      success: true,
      message: "Project fetched successfully",
      data: projects,
    });
  } catch (error) {
    next(error);
  }
};
