import { getRepository, Repository } from 'typeorm';
import { User } from '../models/User';
import { IUserRepository } from './IUserRepository';
import { CreateUserDTO } from '../dtos/CreateUserDTO';

export class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        email,
      },
    });

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return user;
  }

  public async create({
    name, email, password, avatar_url,
  }: CreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({
      name,
      email,
      password,
      avatar_url,
    });

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}
