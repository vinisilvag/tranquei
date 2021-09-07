import { hash } from 'bcryptjs';
import { AppError } from '../errors/AppError';
import { User } from '../models/User';
import { IUserRepository } from '../repositories/IUserRepository';
import { UserRepository } from '../repositories/UserRepository';

type IRequest = {
  name: string;
  email: string;
  password: string;
};

export class CreateUserService {
  private userRepository: IUserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const registeredUser = await this.userRepository.findByEmail(email);

    if (registeredUser) {
      throw new AppError(409, 'User already registered');
    }

    const passwordHash = await hash(password, 8);

    const avatarUrl = `https://avatars.dicebear.com/api/jdenticon/${name}.svg`;

    const user = await this.userRepository.create({
      name,
      email,
      password: passwordHash,
      avatar_url: avatarUrl,
    });

    return user;
  }
}
