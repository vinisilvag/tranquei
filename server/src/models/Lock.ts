import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { User } from './User';

@Entity('locks')
export class Lock {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User, (user) => user.locks)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;
}
