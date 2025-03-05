import { RequestHandler } from 'express';
import logger from '@/utils/logger';
import HTTPException from '@/utils/helpers/http-exception';
import {
  ICreateAdminRequest,
  ICreateAdminResponse,
} from '@/types/interfaces/user';
import { createAdminUser } from '@/services/user';

export const createAdmin: RequestHandler<
  object,
  ICreateAdminResponse,
  ICreateAdminRequest
> = async (req, res, next) => {
  try {
    const { name, email, phoneNumber, password } = req.body;

    const response = await createAdminUser(name, email, phoneNumber, password);

    res.status(201).json(response);
  } catch (err) {
    logger.error('Error creating admin:', err);
    if (err instanceof HTTPException) {
      return next(err);
    }
    return next(HTTPException.internalServerError('Error creating admin'));
  }
};
