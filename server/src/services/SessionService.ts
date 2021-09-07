import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { AppError } from '../errors/AppError';
import { User } from '../models/User';
import { IUserRepository } from '../repositories/IUserRepository';
import { UserRepository } from '../repositories/UserRepository';
import userView from '../views/Users';

type IRequest = {
  email: string;
  password: string;
};

type IResponse = {
  token: string;
  user: Omit<User, 'password' | 'avatar_url' | 'locks' | 'created_at' | 'updated_at'>;
};

export class SessionService {
  private userRepository: IUserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError(404, 'User not found');
    }

    const parsedPassword = await compare(password, user.password);

    if (!parsedPassword) {
      throw new AppError(401, 'Invalid credentials');
    }

    const token = sign({}, process.env.APP_SECRET as string, {
      subject: user.id,
      expiresIn: '7d',
    });

    const filteredUser = userView.render(user);

    return {
      token,
      user: filteredUser,
    };
  }
}
