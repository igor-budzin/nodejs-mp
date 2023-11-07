import { InferSchemaType, Schema, model } from 'mongoose';

// @Entity({ name: 'users' })
// export class User {
//   @PrimaryGeneratedColumn('uuid')
//   id: UUID;

//   @OneToMany(() => Cart, (cart) => cart.user)
//   cart: Cart;

//   @OneToMany(() => Order, (order) => order.user)
//   orders: Order[];
// }


const schema = new Schema({}, {
  versionKey: false
});

export const UserModel = model('User', schema);

export type UserType = InferSchemaType<typeof schema>;
