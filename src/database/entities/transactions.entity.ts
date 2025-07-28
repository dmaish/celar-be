import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { CURRENCY } from '../../utils/constants';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('float')
  amount: number;

  @Column({
      type: 'enum',
      enum: CURRENCY,
   })
   currency: CURRENCY; 

  @CreateDateColumn()
  timestamp: Date;

  @ManyToOne(() => User, (user) => user.sentTransactions)
  sender: User;

  @ManyToOne(() => User, (user) => user.receivedTransactions)
  recipient: User;
}
