import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { CartItem } from '../cart/cartItem.entity';
import { ORDER_STATUS } from './order';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column('decimal')
  total: number;

  @Column({
    type: 'enum',
    enum: ORDER_STATUS
  })
  status: ORDER_STATUS;

  @Column('text')
  comments: string;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @Column()
  userId: UUID;

  @OneToMany(() => CartItem, (cartItem) => cartItem.order)
  items: CartItem[];
}
