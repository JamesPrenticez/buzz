import { type Request, type Response } from 'express';
import { User } from '@prisma/client';
import prisma from '../prisma';

// Get all users
export const getUserDetails = async (req: Request & { email?: string }, res: Response): Promise<void> => {
  const userEmail = req.email; // Get email from request object which is ripped from JWT token

  try {
    const user: any = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    if (!user) {
      res.status(404).json({ message: `User with email ${userEmail} not found` });
      return;
    }

    // Everything except the password hash
    const { firstName, lastName, email, phone, profilePicture, locale, country, permissions, subscription, dateCreated, lastModified } = user;

    const userData = {
      firstName: firstName ?? '',
      lastName: lastName ?? '',
      email,
      phone: phone ?? '',
      profilePicture: profilePicture ?? '',
      locale: locale ?? '',
      country: country ?? '',
      permissions: permissions ?? [],
      subscription: subscription ?? '',
      dateCreated: dateCreated ?? '',
      lastModified: lastModified ?? ''
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

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
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

