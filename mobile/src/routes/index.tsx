import React from 'react';

import { AppRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';

import { useAuth } from '../hooks/useAuth';

export const Routes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <AppRoutes /> : <AuthRoutes />;
};
