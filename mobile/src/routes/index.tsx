import React from 'react';

import AppLoading from 'expo-app-loading';

import { AppRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';

import { useAuth } from '../hooks/useAuth';

export const Routes: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <AppLoading />;

  return isAuthenticated ? <AppRoutes /> : <AuthRoutes />;
};
