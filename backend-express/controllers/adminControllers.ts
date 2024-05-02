import prisma from '../prisma';
import { type User } from '@prisma/client';
import { type Request, type Response } from '@/models';

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  /*
    #swagger.tags = ['Admin']
    #swagger.description = 'Get all users in the database'
  */ 
  try {
    const users: User[] = await prisma.user.findMany();
    res.status(200).json({
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: 'An error occurred while fetching users',
    });
  }
};