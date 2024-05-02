import prisma from '../prisma';
import { type Request, type Response } from '@/models';

export const getAllTasks = async (req: Request, res: Response): Promise<void> => {
  /*
    #swagger.tags = ['Tasks']
    #swagger.description = 'Get all tasks in the database'
    #swagger.parameters['obj'] = {
      in: 'body',
      description: 'Auth credentials.',
      required: true,
      schema: { $ref: "#/definitions/AuthCredentials" }
    }
  */ 
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
