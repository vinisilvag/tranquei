import { Lock } from '../models/Lock';
import { CreateLockDTO } from '../dtos/CreateLockDTO';

export type ILockRepository = {
  findByUserId(id: string): Promise<Lock[]>;
  findById(id: string): Promise<Lock | undefined>;
  create(createLockDTO: CreateLockDTO): Promise<Lock>;
  deleteById(id: string): Promise<void>
};
