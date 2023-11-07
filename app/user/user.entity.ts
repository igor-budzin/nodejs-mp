import { InferSchemaType, Schema, model } from 'mongoose';
import { UserRole } from './userRoles';

const schema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: Object.values(UserRole)
  }
}, {
  versionKey: false
});

export const UserModel = model('User', schema);

export type UserType = InferSchemaType<typeof schema>;
