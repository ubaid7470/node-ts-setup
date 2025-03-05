import { IUser } from '@/types/interfaces/user';
import { Schema, model } from 'mongoose';

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: false,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      enum: ['owner', 'employee'],
    },
    invitationToken: {
      type: String,
      required: false,
    },
    tokenExpiresAt: {
      type: Date,
      required: false,
    },
    passwordHash: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default model<IUser>('User', userSchema);
