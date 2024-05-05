
import { User } from '@prisma/client';
import prisma from '../prisma';
import type { Request, Response } from '@/models';

export const getUser = async (req: Request, res: Response): Promise<any> => {
  /*
    #swagger.tags = ['User']
    #swagger.description = 'Get user details'
    #swagger.security = [{
      "JWT": []
    }]
  */   

  const user_id = req.user_id;

  try {
    const user = await prisma.user.findUnique({
      where: { id: user_id },
    });

    // Destructure user object and replace null values with empty strings
    const { email, first_name, last_name, phone, profile_picture, locale, country, permissions, subscription, date_created, last_modified } = user || {};
    
    // Set default values for properties that might be null
    const userData = {
      first_name: first_name ?? '',
      last_name: last_name ?? '',
      email: email,
      phone: phone ?? '',
      profile_picture: profile_picture ?? '',
      locale: locale ?? '',
      permissions: permissions ?? [],
      subscription: subscription ?? '',
      date_created: date_created ?? '',
      last_modified: last_modified ?? ''
    };

    // Return user data
    return res.status(200).json({data: { 
        data: userData,
    }
  });
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error'});
  }
};