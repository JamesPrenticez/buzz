import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const validateJWT = (req: Request & { user_id?: string }, res: Response, next: NextFunction): void | Response<any>=> {
  // When using HTTPS only we get from a cookie
  // const JWTCookie = req.cookies.JWT_TOKEN;
  // const token = JWTCookie && JWTCookie.split(' ')[1];

  // When not using HTTPS only we get from a header
  const authorizationHeader = req.headers.authorization;
  console.log(authorizationHeader)

  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    return res.sendStatus(401);
  }

  const token = authorizationHeader.split(' ')[1];

  const SECRET_KEY = "your_secret_key_goes_here"

  if (token == null) {
    return res.sendStatus(401);
  }

  // Verify token
  jwt.verify(token, SECRET_KEY as string, (err: any, decoded: any) => {
    if (err) {
      return res.sendStatus(403);
    } else {
      // Token is valid, attach decoded payload to request object
      req.user_id = decoded.user_id; // Attach user_id to request object
      next();
    }
  });
};