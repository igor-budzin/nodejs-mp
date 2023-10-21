import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../products/product.entity';
import { Cart } from './cart.entity';
import { Order } from '../order/order.entity';

@Entity({ name: 'cart_items' })
export class CartItem {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @OneToOne(() => Product)
  @JoinColumn({ name: 'id', referencedColumnName: 'id' })
  product: Product;

  @Column('int')
  count: number;

  @ManyToOne(() => Cart, (cart) => cart.items)
  cart: Cart;

  @Column()
  cartId: UUID;

  // @ManyToOne(() => Order, (order) => order.items)
  // order: Order;
}
