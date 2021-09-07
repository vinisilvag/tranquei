import { hash, compare } from 'bcryptjs';
import { AppError } from '../errors/AppError';
import { User } from '../models/User';
import { IUserRepository } from '../repositories/IUserRepository';
import { UserRepository } from '../repositories/UserRepository';

type IRequest = {
  userId: string;
  name: string;
  email: string;
  oldPassword: string;
  password: string;
};

export class UpdateProfileService {
  private userRepository: IUserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async execute({ userId, name, email, oldPassword, password }: IRequest): Promise<User> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppError(401, 'Only authenticated users can update their profiles');
    }

    if (oldPassword && password) {
      const parsedOldPassword = await compare(oldPassword, user.password);

      if (!parsedOldPassword) {
        throw new AppError(401, 'Old password is wrong');
      }

      const newPasswordHash = await hash(password, 8);

      user.password = newPasswordHash;
    }

    if (email !== user.email) {
      const alreadyRegisteredEmail = await this.userRepository.findByEmail(email);

      if (alreadyRegisteredEmail) {
        throw new AppError(409, 'Email already registered');
      }

      user.email = email;
    }

    const avatarUrl = `https://avatars.dicebear.com/api/jdenticon/${name}.svg`;

    user.name = name;
    user.avatar_url = avatarUrl;

    await this.userRepository.save(user);

    return user;
  }
}
