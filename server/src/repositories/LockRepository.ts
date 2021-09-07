import { getRepository, Repository } from 'typeorm';
import { CreateLockDTO } from '../dtos/CreateLockDTO';
import { Lock } from '../models/Lock';
import { ILockRepository } from './ILockRepository';

export class LockRepository implements ILockRepository {
  private ormRepository: Repository<Lock>;

  constructor() {
    this.ormRepository = getRepository(Lock);
  }

  public async findById(id: string): Promise<Lock | undefined> {
    const lock = this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return lock;
  }

  public async findByUserId(id: string): Promise<Lock[]> {
    const locks = this.ormRepository.find({
      where: {
        user_id: id,
      },
      order: {
        created_at: 'ASC',
      },
      take: 30,
    });

    return locks;
  }

  public async create({ userId, description }: CreateLockDTO): Promise<Lock> {
    const lock = this.ormRepository.create({
      user_id: userId,
      description,
    });

    await this.ormRepository.save(lock);

    return lock;
  }

  public async deleteById(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}
