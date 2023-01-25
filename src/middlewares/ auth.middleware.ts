import { NextFunction, Request, Response } from 'express';
import { getFromRedis } from '../utils/redis.config';

export async function ensureAuthenticate(request: Request, response: Response, next: NextFunction) {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.status(401).json({
      errorCode: 'Token.invalid',
    });
  }

  const [, token] = authorization.split(' ');

  try {
    const exists = await getFromRedis(token);

    if (!exists) {
      return response.status(401).json({
        errorCode: 'Token.invalid',
      });
    }

    return next();
  } catch (err: any) {
    return response.status(401).json({
      errorCode: 'Token.expired'
    });
  }
}