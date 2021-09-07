import { Request, Response } from 'express';
import { UserRepository } from '../repositories/UserRepository';
import { CreateUserService } from '../services/CreateUserService';
import { EnableUserService } from '../services/EnableUserService';
import userView from '../views/Users';

export class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const userRepository = new UserRepository();
    const createUserService = new CreateUserService(userRepository);

    const user = await createUserService.execute({ name, email, password });

    const filteredUser = userView.render(user);

    return response.status(201).json(filteredUser);
  }

  public async enable(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const userRepository = new UserRepository();
    const enableUserService = new EnableUserService(userRepository);

    const user = await enableUserService.execute({ id });

    const filteredUser = userView.render(user);

    return response.status(200).json(filteredUser);
  }
}
