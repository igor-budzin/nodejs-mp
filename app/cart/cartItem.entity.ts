import { InferSchemaType, Schema, model } from 'mongoose';

const schema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  count: {
    type: Number,
    required: true
  }
}, {
  versionKey: false
});

export const CartItemModel = model('CartItem', schema);

export type CartItemType = InferSchemaType<typeof schema>;
