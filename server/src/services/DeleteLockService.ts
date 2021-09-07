import { AppError } from '../errors/AppError';
import { Lock } from '../models/Lock';
import { ILockRepository } from '../repositories/ILockRepository';
import { LockRepository } from '../repositories/LockRepository';

type IRequest = {
  userId: string;
  lockId: string;
};

export class DeleteLockService {
  private lockRepository: ILockRepository;

  constructor(lockRepository: LockRepository) {
    this.lockRepository = lockRepository;
  }

  public async execute({ userId, lockId }: IRequest): Promise<Lock> {
    const lock = await this.lockRepository.findById(lockId);

    if (!lock) {
      throw new AppError(401, 'Invalid lock id');
    }

    if (lock.user_id !== userId) {
      throw new AppError(403, 'You can only delete your own locks');
    }

    await this.lockRepository.deleteById(lockId);

    return lock;
  }
}
