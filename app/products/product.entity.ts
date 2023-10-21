import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CartItem } from '../cart/cartItem.entity';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column('text')
  title: string;

  @Column('text')
  description: string;

  @Column('decimal')
  price: number;

  @OneToMany(() => CartItem, (cartItems) => cartItems.product)
  cartItems: CartItem[];
}
