import React from 'react';

import { AuthProvider } from './auth';
import { LockProvider } from './lock';

export const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <LockProvider>{children}</LockProvider>
  </AuthProvider>
);
