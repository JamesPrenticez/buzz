import { type Request, type Response } from 'express';
import { User } from '@prisma/client';
import prisma from '../prisma';

// Get all users
export const getUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      res.status(404).json({ message: `User with id ${id} not found` });
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
        userData
      },
    });
  } catch (err) {
    console.error(`Error fetching user with id ${id}:`, err);
    res.status(500).json({
      message: `An error occurred while fetching user with id ${id}`,
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

