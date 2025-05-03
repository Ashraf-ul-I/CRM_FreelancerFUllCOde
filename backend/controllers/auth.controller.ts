import { Application, NextFunction, Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../utils/AppError';
import {z} from 'zod';
const prisma = new PrismaClient();

const registerSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/\d/, "Password must contain at least one number")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
});

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
});

export const register = async (req: Request, res: Response,next:NextFunction): Promise<any> => {
  try {
    const parseData = registerSchema.parse(req.body);
    const { name, email, password } = parseData;
    
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      throw new AppError('User already exists',400);
    }

    const hashPassword = await bcryptjs.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, password: hashPassword },
    });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: '7d',
    });

    res.cookie('token',token,{
        httpOnly:true,
        secure:process.env.NODE_ENV ==='production',
        sameSite:'lax'
    })

     res.status(201).json({
      message: 'User created successfully',
      token,
      user: { id: user.id, email: user.email },
    });
  } catch (err) {
    next(err);
  }
};

export const login= async (req:Request,res:Response,next:NextFunction):Promise<any> =>{
    try {
        const parseData = loginSchema.parse(req.body);
        const {email,password}=parseData;

        const user= await prisma.user.findUnique({where:{email:email}});
        //check if the user is db or not
        if(!user){
          throw new AppError('User not found',404)
        }

        //now if the user is valid then we have to check the password is correct or not
        //so it is done by the bcryptjs compare function.
        const isValid= await bcryptjs.compare(password,user.password);
        if (!isValid) throw new AppError('Invalid password',400);

        const token=jwt.sign({userId:user.id},process.env.JWT_SECRET!,{expiresIn:'7d'});

        res.cookie('token',token,{
            httpOnly:true,
            secure:process.env.NODE_ENV ==='production',
            sameSite:'lax'
        })
         res.status(200).json({
            success: true,
            message: 'Login successful',
            data: {
              user: { id: user.id, email: user.email, name: user.name },
              token,
            },
          });
    } catch (error) {
        console.error('Login error:', error);
        throw new AppError( 'Server error',500);
    }
}

export const logout= async(req:Request,res:Response):Promise<any> =>{
    res.clearCookie('token',{
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
    });
    return res.status(200).json({
        success: true,
        message: 'Logged out successfully',
      });
}