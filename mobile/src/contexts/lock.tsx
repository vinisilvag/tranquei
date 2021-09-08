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
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const loadUserLocks = async (): Promise<void> => {
      try {
        const response = await api.get('/locks');

        setLocks(response.data);
      } catch (err) {
        ToastAndroid.show(err.response.data.message, ToastAndroid.LONG);
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
    } catch (err) {
      ToastAndroid.show(err.response.data.message, ToastAndroid.LONG);
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
      value={{ locks, createLock, deleteLock, onRefresh, isRefreshing }}
    >
      {children}
    </LockContext.Provider>
  );
};
