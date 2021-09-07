import { AppError } from '../errors/AppError';
import { Lock } from '../models/Lock';
import { ILockRepository } from '../repositories/ILockRepository';
import { IUserRepository } from '../repositories/IUserRepository';
import { LockRepository } from '../repositories/LockRepository';
import { UserRepository } from '../repositories/UserRepository';

type IRequest = {
  userId: string;
  description: string;
};

export class CreateLockService {
  private lockRepository: ILockRepository;

  private userRepository: IUserRepository;

  constructor(lockRepository: LockRepository, userRepository: UserRepository) {
    this.lockRepository = lockRepository;
    this.userRepository = userRepository;
  }

  public async execute({ userId, description }: IRequest): Promise<Lock> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppError(403, 'Only authenticated users can create locks');
    }

    const lock = await this.lockRepository.create({
      userId,
      description,
    });

    return lock;
  }
}
