import { Router } from 'express';

import { userRoutes } from './user.routes';
import { sessionRoutes } from './session.routes';
import { lockRoutes } from './lock.routes';
import { profileRoutes } from './profile.routes';

const routes = Router();

const routePrefix = '/api/v1';

routes.use(`${routePrefix}/users`, userRoutes);
routes.use(`${routePrefix}/profile`, profileRoutes);
routes.use(`${routePrefix}/session`, sessionRoutes);
routes.use(`${routePrefix}/locks`, lockRoutes);

export { routes };
