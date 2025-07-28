import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BeforeInsert,
} from 'typeorm';
import { Transaction } from './transactions.entity';
import { USER_ROLE } from '../../utils/constants';
import { genSalt } from 'bcrypt';
import { hashPassword } from '../../utils/auth';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ select: false })
  salt: string;

  @Column({
    type: 'enum',
    enum: USER_ROLE,
    default: USER_ROLE.DEV,
  })
  role: USER_ROLE;   

  @OneToMany(() => Transaction, (tx) => tx.sender)
  sentTransactions: Transaction[];

  @OneToMany(() => Transaction, (tx) => tx.recipient)
  receivedTransactions: Transaction[];


  @BeforeInsert()
  private async generateSaltAndHash(): Promise<void> {
    if (this.password) {
      this.salt = await genSalt();
      this.password = await hashPassword(this.password, this.salt);
    }
  }
}
