import { Request, Response } from 'express';
import { LockRepository } from '../repositories/LockRepository';
import { UserRepository } from '../repositories/UserRepository';
import { CreateLockService } from '../services/CreateLockService';
import { DeleteLockService } from '../services/DeleteLockService';
import { ListLockService } from '../services/ListLockService';
import lockView from '../views/Locks';

export class LockController {
  public async list(request: Request, response: Response): Promise<Response> {
    const { id: userId } = request.user;

    const lockRepository = new LockRepository();
    const userRepository = new UserRepository();
    const listLockService = new ListLockService(lockRepository, userRepository);

    const locks = await listLockService.execute({ userId });

    const filteredLocks = lockView.renderMany(locks);

    return response.json(filteredLocks);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { id: userId } = request.user;
    const { description } = request.body;

    const lockRepository = new LockRepository();
    const userRepository = new UserRepository();
    const createLockService = new CreateLockService(lockRepository, userRepository);

    const lock = await createLockService.execute({ userId, description });

    const filteredLock = lockView.render(lock);

    return response.status(201).json(filteredLock);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id: userId } = request.user;
    const { id } = request.params;

    const lockRepository = new LockRepository();
    const deleteLockService = new DeleteLockService(lockRepository);

    const lock = await deleteLockService.execute({ userId, lockId: id });

    const filteredLock = lockView.render(lock);

    return response.json(filteredLock);
  }
}
