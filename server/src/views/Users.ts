import { User } from '../models/User';
import { UserRoles } from '../enums/UserRoles';

type UserViewReturn = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  active: boolean;
  role: UserRoles;
  createdAt: Date;
  updatedAt: Date;
};

export default {
  render(user: User): UserViewReturn {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      avatarUrl: user.avatar_url,
      active: user.active,
      role: user.role,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    };
  },
};
