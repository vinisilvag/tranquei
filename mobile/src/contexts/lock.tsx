import React, { createContext, useState, useEffect } from 'react';
import { ToastAndroid } from 'react-native';
import { useAuth } from '../hooks/useAuth';

import { api } from '../services/api';

type Lock = {
  id: string;
  description: string;
  createdAt: string;
};

type LockContextType = {
  locks: Lock[];
  isLoading: boolean;
  isRefreshing: boolean;
  onRefresh(): Promise<void>;
  createLock(description: string): Promise<void>;
  deleteLock(id: string): Promise<void>;
};

export const LockContext = createContext<LockContextType>(
  {} as LockContextType,
);

export const LockProvider: React.FC = ({ children }) => {
  const [locks, setLocks] = useState<Lock[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const loadUserLocks = async (): Promise<void> => {
      try {
        const response = await api.get('/locks');

        setLocks(response.data);
      } catch (err: any) {
        console.log(err);

        const errorMessage = err.response.data.message || 'Unexpected error';
        ToastAndroid.show(errorMessage, ToastAndroid.LONG);
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated) loadUserLocks();
  }, [isAuthenticated]);

  const onRefresh = async (): Promise<void> => {
    if (!isAuthenticated) return;

    setIsRefreshing(true);

    try {
      const response = await api.get('/locks');

      setLocks(response.data);
    } catch (err: any) {
      console.log(err);

      const errorMessage = err.response.data.message || 'Unexpected error';
      ToastAndroid.show(errorMessage, ToastAndroid.LONG);
    } finally {
      setIsRefreshing(false);
    }
  };

  const createLock = async (description: string): Promise<void> => {
    const { data: newLock } = await api.post('/locks', {
      description,
    });

    setLocks([...locks, newLock]);
  };

  const deleteLock = async (id: string): Promise<void> => {
    await api.delete(`/locks/${id}`);

    const filteredLocks = locks.filter(lock => lock.id !== id);

    setLocks(filteredLocks);
  };

  return (
    <LockContext.Provider
      value={{
        locks,
        createLock,
        deleteLock,
        isLoading,
        onRefresh,
        isRefreshing,
      }}
    >
      {children}
    </LockContext.Provider>
  );
};
