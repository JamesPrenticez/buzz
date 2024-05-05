import prisma from '../prisma';
import { type User, type TaskData } from '@prisma/client';

// import { Request, Response } from 'express';
import { type Request, type Response } from '@/models';

// GET
export const getUserTasks = async (req: Request, res: Response): Promise<void> => {
  /* 
    #swagger.tags = ['User Tasks']
    #swagger.description = 'Get all tasks associated to a user'
    #swagger.parameters['start_date'] = {
      in: 'query',
      description: 'Start date for filtering tasks (YYYY-MM-DD)',
      required: true,
      type: 'string'
    }
    #swagger.parameters['end_date'] = {
      in: 'query',
      description: 'End date for filtering tasks (YYYY-MM-DD)',
      required: true,
      type: 'string'
    }
    #swagger.security = [{
      "JWT": []
    }]
  */   

  const user_id = req.user_id;
  const { start_date, end_date } = req.params;

  try {
    const userTasksWithDetails = await prisma.taskData.findMany({
      where: { 
        user_id,
        date_created: {
          gte: new Date(start_date), // greater than or equal
          lte: new Date(end_date), // less than or equal
        }
      },
      include: {
        task: {
          select: {
            title: true,
            description: true
          }
        }
      }
    });

    if (!userTasksWithDetails) {
      res.status(204).json({message: `No data for ${user_id} between ${start_date} and ${end_date}`});
      return;
    }

    const formattedTasks = userTasksWithDetails.map(taskData => ({
      task_data_id: taskData.id,
      title: taskData.task.title,
      date_created: taskData.date_created,
      quantity: taskData.quantity,
      unit: taskData.unit
    }));

 
    res.status(200).json({
      data: {
        data: formattedTasks,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: 'An error occurred while fetching users tasks',
    });
  }
};

// POST
export const createUserTask = async (req: Request, res: Response): Promise<void> => {
  /* 
    #swagger.tags = ['User Tasks']
    #swagger.description = 'Create a new data object for a user task'
    #swagger.security = [{
      "JWT": []
    }]
  */  

  const user_id: User["id"] = req.user_id ?? "";

  if (!user_id) {
    res.status(404).json({
      error: 'User not found ?!',
    });
    return;
  }
  
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
        data: newTask,
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
export const updateUserTask = async (req: Request, res: Response): Promise<void> => {
  /* 
    #swagger.tags = ['User Tasks']
    #swagger.description = 'Update a data object for a user task'
    #swagger.security = [{
      "JWT": []
    }]
  */  

  const user_id = req.user_id;
  const task_id = req.params.task_id;
  console.log(task_id)
  
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
        data: updatedTask,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'An error occurred while updating the task',
    });
  }
};