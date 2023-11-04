import { InferSchemaType, Schema, model } from 'mongoose';

const schema = new Schema({
  isDeleted: {
    type: Boolean,
    default: false
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

export const CartModel = model('Cart', schema);

export type CartType = InferSchemaType<typeof schema>;
