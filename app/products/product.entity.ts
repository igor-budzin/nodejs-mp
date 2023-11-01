import mongoose, { InferSchemaType, Schema } from 'mongoose';

// @Entity({ name: 'products' })
// export class Product {
//   @PrimaryGeneratedColumn('uuid')
//   id: UUID;

//   @Column('text')
//   title: string;

//   @Column('text')
//   description: string;

//   @Column('decimal')
//   price: number;

//   @OneToMany(() => CartItem, (cartItems) => cartItems.product)
//   cartItems: CartItem[];
// }


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

export const ProductModel = mongoose.model('Product', schema);

export type ProductType = InferSchemaType<typeof schema>;
