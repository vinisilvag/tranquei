import { Router } from 'express';
import { LockController } from '../controllers/LockController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const lockController = new LockController();

const lockRoutes = Router();

lockRoutes.use(ensureAuthenticated);

lockRoutes.get('/', lockController.list);
lockRoutes.post('/', lockController.create);
lockRoutes.delete('/:id', lockController.delete);

export { lockRoutes };
