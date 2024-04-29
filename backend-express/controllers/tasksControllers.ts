import { type Request, type Response } from 'express';
import prisma from '../prisma';

export const getAllTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const tasks: any = await prisma.task.findMany();

    res.status(200).json({
      data: {
        tasks
      }
    })

  } catch (err){
    res.status(500).json({
      message: 'An error occurred while fetching tasks',
    });
  }
}
