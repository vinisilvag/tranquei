import {
  Column,
  CreateDateColumn,
  Entity, OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Lock } from './Lock';
import { UserRoles } from '../enums/UserRoles';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column()
  avatar_url: string;

  @Column({
    default: true,
  })
  active: boolean;

  @Column({
    type: 'enum',
    enum: UserRoles,
    default: UserRoles.NORMAL,
  })
  role: UserRoles;

  @OneToMany(() => Lock, (lock) => lock.user)
  locks: Lock[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
