import { User } from './User';

export interface iUserRepository {
  getUserByUserId(userId: string): Promise<User | null>
}