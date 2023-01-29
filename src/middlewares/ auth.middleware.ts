import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Redis from 'ioredis';
import { getFromRedis, setIntoRedis } from '../utils/redis.config';

const redis = new Redis();

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

    if (exists) {
      request.token = token;

      console.log('get from redis :)');

      return next();
    }
    
    await setIntoRedis(token, token);
    request.token = token;
    
    return next();
  } catch (err: any) {
    return response.status(401).json({
      errorCode: 'Token.expired'
    });
  }
}