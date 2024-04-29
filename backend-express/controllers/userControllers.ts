import { type Request, type Response } from 'express';
import { TaskData, User } from '@prisma/client';
import prisma from '../prisma';

// Get all users
export const getUserDetails = async (req: Request & { email?: string }, res: Response): Promise<void> => {
  const userEmail = req.email; // Get email from request object which is ripped from JWT token

  try {
    const user: User | null = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    if (!user) {
      res.status(404).json({ message: `User with email ${userEmail} not found` });
      return;
    }

    // Everything except the password hash
    const { first_name, last_name, email, phone, profile_picture, locale, country, permissions, subscription, date_created, last_modified } = user;

    const userData = {
      first_name: first_name ?? '',
      last_name: last_name ?? '',
      email,
      phone: phone ?? '',
      profilePicture: profile_picture ?? '',
      locale: locale ?? '',
      country: country ?? '',
      permissions: permissions ?? [],
      subscription: subscription ?? '',
      dateCreated: date_created ?? '',
      lastModified: last_modified ?? ''
    };

    res.status(200).json({
      data: {
        data: userData
      },
    });
  } catch (err) {
    console.error(`Error fetching user with email ${userEmail}:`, err);
    res.status(500).json({
      message: `An error occurred while fetching user with email ${userEmail}`,
    });
  }
};

export const getUserTasks = async (req: Request & { user_id?: string }, res: Response): Promise<void> => {
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

