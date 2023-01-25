import { NextFunction, Request, Response } from 'express';
import { AuthService } from '../services/AuthService';
import { getFromRedis, setIntoRedis } from '../utils/redis.config';

const googleService = new AuthService();

export async function authCache(request: Request, response: Response, next: NextFunction) {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.status(401).json({
      errorCode: 'Token.invalid',
    });
  }

  const [, token] = authorization.split(' ');

  const exists = await getFromRedis(token);
  if (exists) {
    const user = JSON.parse(exists);
    response.json(user);
    
    return next();
  }

  try {
    const googleResponse = await googleService.execute(token);
    if (!googleResponse?.payload) return;

    await setIntoRedis(token, JSON.stringify(googleResponse.user));

    response.json(googleResponse.user);

    return next();
  } catch (err: any) {
    return response.status(401).json({
      errorCode: 'Token.expired'
    });
  }
}