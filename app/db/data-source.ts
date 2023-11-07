import 'dotenv/config';
import mongoose from 'mongoose';

export const connectDb = () => {
  const url = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@127.0.0.1:27017/${process.env.MONGO_INITDB_DATABASE}?authSource=admin`;
  mongoose.connect(url);
  return mongoose.connection;
};