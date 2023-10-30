import { Column, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { CartItem } from './cartItem.entity';

@Entity({ name: 'carts' })
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @ManyToOne(() => User, (user) => user.cart)
  user: User;

  @Column()
  userId: string;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart, {
    eager: true
  })
  items: CartItem[];
}