import { InferSchemaType, Schema, model } from 'mongoose';

const schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  }
}, {
  versionKey: false
});

export const ProductModel = model('Product', schema);

export type ProductType = InferSchemaType<typeof schema>;
