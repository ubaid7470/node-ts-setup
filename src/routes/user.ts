import express from 'express';
import { createAdmin } from '@/controllers/user';
import { validate } from '@/middlewares/validation';
import { createAdminSchema } from '@/validations/user';

const adminRouter = express.Router();

adminRouter.post('/create-admin', validate(createAdminSchema), createAdmin);

export default adminRouter;
