import { type Request, type Response } from 'express';
import { TaskData } from '@prisma/client';
import prisma from '../prisma';

// GET

// Define a custom Request interface extending the Express Request interface
interface ProtectedRequest extends Request {
  user_id?: string; 
}

export const getUserTasks = async (req: ProtectedRequest, res: Response): Promise<void> => {
  /* 
    #swagger.tags = ['User']
    #swagger.description = 'Get all tasks associated to a user'
    #swagger.security = [{
      "JWT": []
    }]
  */   
  const user_id = req.user_id;

  try {
    const userTasksWithDetails = await prisma.taskData.findMany({
      where: { user_id },
      include: {
        task: {
          select: {
            title: true,
            description: true
          }
        }
      }
    });

    const formattedTasks = userTasksWithDetails.map(taskData => ({
      task_data_id: taskData.id,
      title: taskData.task.title,
      date_created: taskData.date_created,
      quantity: taskData.quantity,
      unit: taskData.unit
    }));

 
    res.status(200).json({
      data: {
        formattedTasks,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: 'An error occurred while fetching users tasks',
    });
  }
};

// POST route to create a new task
export const createUserTask = async (req: Request & { user_id?: string }, res: Response): Promise<void> => {
  const user_id = "1" // req.user_id;
  
  const { 
    task_id, // sleep, meditation ect...
    quantity,
    unit
  } = req.body;

  try {
    // Check if task exists
    const existingTask = await prisma.task.findUnique({
      where: {
        id: task_id,
      },
    });

    if (!existingTask) {
      res.status(404).json({
        message: 'Task not found',
      });
      return;
    }

    const newTask: TaskData = await prisma.taskData.create({
      data: {
        task_id,
        user_id,
        date_created: new Date(),
        quantity,
        unit,
      }
    });

    res.status(201).json({
      data: {
        newTask,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'An error occurred while creating a new task',
    });
  }
};

// PATCH
export const updateUserTask = async (req: Request & { user_id?: string }, res: Response): Promise<void> => {
  const user_id = "1" // req.user_id;
  const task_id = "1" // req.params.task_id;
  
  const { 
    quantity,
    unit
  } = req.body;

  try {
    // First, check if the task belongs to the user
    const task = await prisma.taskData.findFirst({
      where: {
        id: task_id,
        user_id,
      },
    });

    if (!task) {
      res.status(404).json({
        message: 'Task not found or does not belong to the user',
      });
      return;
    }

    // Update the task
    const updatedTask = await prisma.taskData.update({
      where: {
        id: task_id,
      },
      data: {
        quantity,
        unit,
      },
    });

    res.status(200).json({
      data: {
        updatedTask,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'An error occurred while updating the task',
    });
  }
};