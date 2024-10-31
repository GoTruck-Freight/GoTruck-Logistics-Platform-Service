import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

// Extend the Request interface to include the user property
declare module 'express-serve-static-core' {
  interface Request {
    user?: any;
  }
}

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // "Bearer <token>" formatında olur

  if (!token) return res.status(401).json({ message: 'Access token missing' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired token' });

    // Token etibarlı olarsa, istifadəçi məlumatını req obyektinə əlavə edirik
    req.user = user;
    next();
  });
};