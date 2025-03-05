import { Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  phoneNumber?: string;
  role: 'owner' | 'employee';
  invitationToken: string;
  tokenExpiresAt: Date;
  passwordHash: string;
}

export interface ICreateAdminRequest {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export interface ICreateAdminResponse {
  success: boolean;
  message: string;
  data: IUser;
}
