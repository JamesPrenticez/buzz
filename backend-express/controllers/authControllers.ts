
import { type Request, type Response } from 'express';
import prisma from '../prisma';
import jwt  from 'jsonwebtoken'
import { createHashedPassword, verifyPassword } from '../utils';

// const secret = process.env.SECRET_KEY 

// Login
export const login = async (req: Request, res: Response): Promise<any> => {
  /*
    #swagger.tags = ['Auth']
    #swagger.description = 'Login user and return JWT access & refresh along with user details'
    #swagger.parameters['obj'] = {
      in: 'body',
      description: 'Auth credentials.',
      required: true,
      schema: { $ref: "#/definitions/AuthCredentials" }
    }
  */   
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user && await verifyPassword(password, user.password_hash)) {
      // Generate a JWT token
      const accessToken = jwt.sign({ email: user.email, user_id: user.id }, "your_secret_key_goes_here", { expiresIn: '30m' });
      const refreshToken = jwt.sign({ email: user.email, user_id: user.id }, "your_secret_key_goes_here", { expiresIn: '24h' });
      
      // Destructure user object and replace null values with empty strings
      const { first_name, last_name, phone, profile_picture, locale, country, permissions, subscription, date_created, last_modified } = user || {};
      
      // Set default values for properties that might be null
      const userData = {
        first_name: first_name ?? '',
        last_name: last_name ?? '',
        email,
        phone: phone ?? '',
        profile_picture: profile_picture ?? '',
        locale: locale ?? '',
        country: country ?? '',
        permissions: permissions ?? [],
        subscription: subscription ?? '',
        date_created: date_created ?? '',
        last_modified: last_modified ?? ''
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
        access_token: accessToken,
        refresh_token: refreshToken
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
  /* #swagger.tags = ['Auth']
     #swagger.description = 'Create a new user'

      #swagger.parameters['obj'] = {
        in: 'body',
        description: 'Auth credentials.',
        required: true,
        schema: { $ref: "#/definitions/AuthCredentials" }
      }
  */ 
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
        password_hash: hashedPassword,
      },
    });

    // Return a success message along with user data if needed
    return res.status(201).json({ message: 'User registered successfully' });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
