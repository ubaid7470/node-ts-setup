import bcrypt from 'bcrypt';
import User from '@/models/users';
import { USER_ROLE } from '@/constants';
import HTTPException from '@/utils/helpers/http-exception';
import type { ICreateAdminResponse } from '@/types/interfaces/user';

export const createAdminUser = async (
  name: string,
  email: string,
  phoneNumber: string,
  password: string,
): Promise<ICreateAdminResponse> => {
  const existingAdmin = await User.findOne({
    email,
    role: USER_ROLE.OWNER,
  });

  if (existingAdmin) {
    throw HTTPException.conflict('Admin already exists');
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const adminUser = new User({
    name,
    email,
    phoneNumber,
    passwordHash,
    role: USER_ROLE.OWNER,
  });

  await adminUser.save();

  return {
    success: true,
    message: 'Admin created successfully',
    data: adminUser,
  };
};
