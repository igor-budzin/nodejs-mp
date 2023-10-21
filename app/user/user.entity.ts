import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Cart } from '../cart/cart.entity';
import { Order } from '../order/order.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @OneToMany(() => Cart, (cart) => cart.user)
  cart: Cart;

  // @OneToMany(() => Order, (order) => order.user)
  // orders: Order[];
}
