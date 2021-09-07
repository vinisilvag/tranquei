import { Router } from 'express';
import { ProfileController } from '../controllers/ProfileController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const profileController = new ProfileController();

const profileRoutes = Router();

profileRoutes.use(ensureAuthenticated);

profileRoutes.get('/', profileController.show);
profileRoutes.put('/', profileController.update);

export { profileRoutes };
