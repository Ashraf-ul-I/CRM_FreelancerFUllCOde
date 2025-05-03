
// 👥Clients
// • Each user can create, update, delete, and view their own clients
// • Required fields: name, email, phone
// • Optional fields: company, notes

import { NextFunction, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../utils/AppError';
const prisma = new PrismaClient();


export const newClient= async (req:Request,res:Response,next:NextFunction):Promise<any>=>{

    try {
        const userId= (req as any).user.userId;
        const {name,email,phone,company,notes}=req.body;
        const newUserClient= await prisma.client.create({
            data:{
                name,
                email,
                phone,
                company,
                notes,
                user:{connect:{id:userId}}

            }
        }) 
        res.status(201).json({ message: 'Client created successfully', client: newUserClient });
        
    } catch (error) {
        throw new AppError('Server Error',500)
    }
}

export const updateClientData = async (
    req: Request<{ clientId: string }, {}, { name?: string; email?: string; phone?: string; company?: string; notes?: string }, {}>,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const userId = (req as any).user.userId;
      const { clientId } = req.params;
      const { name, email, phone, company, notes } = req.body;
  
      const updateData: any = {};
      if (name) updateData.name = name;
      if (email) updateData.email = email;
      if (phone) updateData.phone = phone;
      if (company) updateData.company = company;
      if (notes) updateData.notes = notes;
  
      const updatedClient = await prisma.client.updateMany({ 
        where: {
          id: clientId, 
          userId,      // Ensuring that the client belongs to the logged-in user
        },
        data: updateData,
      });
  
      if (!updatedClient) {
        return res.status(404).json({ message: 'Client not found' });
      }
  
      res.status(200).json({ message: 'Client updated successfully', client: updatedClient });
    } catch (error) {
      
      throw new AppError('Server Error', 500);
    }
  };

  export const deleteClientData = async (
    req: Request<{ clientId: string }, {}, {}>,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const userId = (req as any).user.userId;
      const { clientId } = req.params;
      const deleteClient = await prisma.client.deleteMany({ 
        where: {
          id: clientId, 
          userId,      // Ensuring that the client belongs to the logged-in user
        }
      });
  
      res.status(200).json({ message: 'Client deleted successfully',deleted:deleteClient });
    } catch (error) {
      
      throw new AppError('Server Error', 500);
    }
  };

  export const getClient = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const userId = (req as any).user.userId;
  
      if (!userId || userId.trim() === '') {
        return res.status(404).json({ message: "There is no userId Found" });
      }
  
      const clientOfUser = await prisma.client.findMany({
        where: { userId },
        include:{
          projects:true, 
        }
      });
  
      res.status(200).json({
        success: true,
        message: "Clients fetched successfully",
        client: clientOfUser
      });
  
    } catch (error) {
      console.error(error);
      next(new AppError("Internal Server Error", 500));
    }
  };
  
  export const getClientData = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const userId = (req as any).user.userId;
      const { clientId } = req.params;
  
      if (!userId || userId.trim() === '' || !clientId || clientId.trim() === '') {
        return res.status(404).json({ message: "There is no userId or clientId provided" });
      }
  
      const clientOfUser = await prisma.client.findFirst({
        where: {
          id: clientId, //find method needs something unique so id is needed which value is specific client id
          userId: userId,
        },
      });
  
      if (!clientOfUser) {
        return res.status(404).json({ message: "Client not found for this user" });
      }
  
      res.status(200).json({
        success: true,
        message: "Client fetched successfully",
        client: clientOfUser
      });
  
    } catch (error) {
      next(new AppError("Internal Server Error", 500));
    }
  };
  
  