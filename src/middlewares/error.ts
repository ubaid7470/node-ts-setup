import { NextFunction, Request, Response } from 'express';
import HTTPException from '@/utils/helpers/http-exception';

const errorHandler = (
  err: HTTPException,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.error('error', err.message);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'An internal server error occurred',
  });
};

export default errorHandler;
