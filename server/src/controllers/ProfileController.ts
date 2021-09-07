import { Request, Response } from 'express';
import { UserRepository } from '../repositories/UserRepository';
import { ListProfileService } from '../services/ListProfileService';
import { UpdateProfileService } from '../services/UpdateProfileService';
import userView from '../views/Users';

export class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const userRepository = new UserRepository();
    const listProfileService = new ListProfileService(userRepository);

    const user = await listProfileService.execute({ id });

    const filteredUser = userView.render(user);

    return response.json(filteredUser);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id: userId } = request.user;
    const { name, email, oldPassword, password } = request.body;

    const userRepository = new UserRepository();
    const updateProfileService = new UpdateProfileService(userRepository);

    const user = await updateProfileService.execute({ userId, name, email, oldPassword, password });

    const filteredUser = userView.render(user);

    return response.status(204).json(filteredUser);
  }
}
