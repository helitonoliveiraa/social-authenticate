import { NextFunction, Request, Response } from 'express';
import { Cache } from '../lib/Cache';

export async function ensureAuthenticate(request: Request, response: Response, next: NextFunction) {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.status(401).json({
      errorCode: 'Token.invalid',
    });
  }

  const redis = new Cache();

  const [, token] = authorization.split(' ');
  
  const exists = await redis.getToken(token);
  if (exists) {
    return next();
  }

  try {
    await redis.setToken(token, token);

    return next();
  } catch (err: any) {
    return response.status(401).json({
      errorCode: 'Token.expired'
    });
  }
}