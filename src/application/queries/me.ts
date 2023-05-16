import { User } from '../../model/user/User';

type BaseInput = {
  user: User,
};

export const me = async ({ user }: BaseInput): Promise<User> => {
  return user;
};