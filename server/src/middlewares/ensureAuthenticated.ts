import {
  Request,
  Response,
  NextFunction,
} from 'express';
import { verify } from 'jsonwebtoken';
import { AppError } from '../errors/AppError';

type TokenPayLoad = {
  iat: number;
  exp: number;
  sub: string;
};

export const ensureAuthenticated = (
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<unknown> | void => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError(401, 'JWT token is missing');
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, String(process.env.APP_SECRET));

    const { sub } = decoded as TokenPayLoad;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError(401, 'JWT token is invalid');
  }
};
