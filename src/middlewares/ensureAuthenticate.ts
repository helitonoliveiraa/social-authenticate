import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export function ensureAuthenticate(request: Request, response: Response, next: NextFunction) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({
      errorCode: 'Token.invalid',
    });
  }

  const [, token] = authToken.split(' ');

  try {
    const { sub } = jwt.verify(token, process.env.JWT_SECRET);

    request.userId = sub as string;

    return next();
  } catch (err: any) {
    return response.status(401).json({
      errorCode: 'Token.expired'
    });
  }

  next();
}