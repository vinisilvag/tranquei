import { AppError } from '../errors/AppError';
import { Lock } from '../models/Lock';
import { ILockRepository } from '../repositories/ILockRepository';
import { IUserRepository } from '../repositories/IUserRepository';
import { LockRepository } from '../repositories/LockRepository';
import { UserRepository } from '../repositories/UserRepository';

type IRequest = {
  userId: string;
};

export class ListLockService {
  private lockRepository: ILockRepository;

  private userRepository: IUserRepository;

  constructor(lockRepository: LockRepository, userRepository: UserRepository) {
    this.lockRepository = lockRepository;
    this.userRepository = userRepository;
  }

  public async execute({ userId }: IRequest): Promise<Lock[]> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppError(401, 'Only authenticated users can list locks');
    }

    const locks = await this.lockRepository.findByUserId(userId);

    return locks;
  }
}
