
import { type Request, type Response } from 'express';
import prisma from '../prisma';
import jwt  from 'jsonwebtoken'
import { createHashedPassword, verifyPassword } from '../utils';

// const secret = process.env.SECRET_KEY 

// Login
export const login = async (req: Request, res: Response): Promise<any> => {  
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user && await verifyPassword(password, user.passwordHash)) {
      // Generate a JWT token
      const accessToken = jwt.sign({ email: user.email, id: user.id }, "your_secret_key_goes_here", { expiresIn: '30m' });
      const refreshToken = jwt.sign({ email: user.email, id: user.id }, "your_secret_key_goes_here", { expiresIn: '24h' });
      
      // Destructure user object and replace null values with empty strings
      const { firstName, lastName, phone, profilePicture, locale, country, permissions, subscription, dateCreated, lastModified } = user || {};
      
      // Set default values for properties that might be null
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

      // HTTPS is lie - client has to be able to read it
      // // Set access token as HTTP-only cookie
      // read comment here
      // https://stackoverflow.com/questions/76097637/protected-routes-in-react-using-httponly-jwt

      // res.cookie('access_token', accessToken, {
      //   httpOnly: true,
      //   secure: true, // Set to true if your application is served over HTTPS
      //   sameSite: 'strict', // Helps prevent CSRF attacks
      //   expires: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes
      // });

      // // Set refresh token as HTTP-only cookie
      // res.cookie('refresh_token', refreshToken, {
      //   httpOnly: true,
      //   secure: true, // Set to true if your application is served over HTTPS
      //   sameSite: 'strict', // Helps prevent CSRF attacks
      //   expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      // });

      // Return user data
      return res.status(200).json({data: { 
        data: userData,
        accessToken: accessToken,
        refreshToken: refreshToken
      }});
    } else {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error'});
  }
};

// Register
export const register = async (req: Request, res: Response): Promise<any> => {  
  const { email, password } = req.body;

  try {
    // Check if the username is already taken
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({ error: 'Email is already taken' });
    }

    // Create a hashed password
    const hashedPassword = await createHashedPassword(password);

    // Save the user to the database
    const newUser = await prisma.user.create({
      data: {
        email,
        passwordHash: hashedPassword,
      },
    });

    // Return a success message along with user data if needed
    return res.status(201).json({ message: 'User registered successfully', data: newUser });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
