import { Lock } from '../models/Lock';

type LockViewReturn = {
  id: string;
  description: string;
  createdAt: Date;
};

export default {
  render(lock: Lock): LockViewReturn {
    return {
      id: lock.id,
      description: lock.description,
      createdAt: lock.created_at,
    };
  },
  renderMany(locks: Lock[]): LockViewReturn[] {
    return locks.map((lock) => this.render(lock));
  },
};
