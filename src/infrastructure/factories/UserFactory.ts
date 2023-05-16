import { Scope } from '../../model/user/Scope';
import { User } from '../../model/user/User';

export class UserFactory {
  static createFromAuth0(data: {
    userId: string
    email: string
    name?: string | null
    roles?: string[]
    scopes?: Array<Scope>
  }): User {
    return new User({
      userId: data.userId,
      email: data.email,
      name: data.name,
      roles: data.roles,
      scopes: data.scopes,
    });
  }

  static createFromPrisma(data: {
    userId: string
    email: string
    name?: string | null
    lastName?: string | null
    roles?: string[]
    scopes?: Array<Scope>
  }): User {
    return new User({
      userId: data.userId,
      email: data.email,
      name: data.name,
      lastName: data.lastName,
      roles: data.roles,
      scopes: data.scopes,
    });
  }

  static createFromMinimalInputs(data: {
    userId: string
    email: string
    name?: string | null
    lastName?: string | null
  }): User {
    return new User({
      userId: data.userId,
      email: data.email,
      name: data.name,
      lastName: data.lastName,
    });
  }
}
