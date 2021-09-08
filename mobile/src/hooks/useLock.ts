import { useContext } from 'react';
import { LockContext } from '../contexts/lock';

export const useLock = () => {
  const context = useContext(LockContext);

  return context;
};
