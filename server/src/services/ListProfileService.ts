import { AppError } from '../errors/AppError';
import { User } from '../models/User';
import { IUserRepository } from '../repositories/IUserRepository';
import { UserRepository } from '../repositories/UserRepository';

type IRequest = {
  id: string;
};

export class ListProfileService {
  private userRepository: IUserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async execute({ id }: IRequest): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError(401, 'Only authenticated users can list their profile');
    }

    return user;
  }
}
