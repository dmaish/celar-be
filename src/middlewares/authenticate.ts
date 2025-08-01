import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers.authorization
    || req.body?.token
    || req.query?.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Please provide a token',
    });
  }

  const secret = process.env.JWT_SECRET_KEY;
  if (!secret) {
    return res.status(500).json({
      success: false,
      error: 'JWT secret key is not configured',
    });
  }

  // If the token came from the Authorization header, remove "Bearer "
  if (typeof token === 'string' && token.startsWith('Bearer ')) {
    token = token.slice(7); // remove "Bearer "
  }

  jwt.verify(
    token,
    secret,
    (error: any, decodedToken: any) => {
      if (error) {
        return res.status(401).json({
          success: false,
          error: 'Token is not valid',
        });
      }
      req.user = decodedToken;
      return next();
    },
  );
};
