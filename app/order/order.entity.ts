import { InferSchemaType, Schema, model } from 'mongoose';
import { ORDER_STATUS } from './order';

const schema = new Schema({
  status: {
    type: String,
    enum: Object.values(ORDER_STATUS),
    reqired: true
  },
  total: {
    type: Number,
    reqired: true
  },
  comments: {
    type: String,
    reqired: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: 'CartItem',
    }
  ],
}, {
  versionKey: false
});

export const OrderModel = model('Order', schema);

export type OrderType = InferSchemaType<typeof schema>;

