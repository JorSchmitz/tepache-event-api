import { iEntity } from '../../infrastructure/iEntity';
import { UserSnapshot } from './UserSnapshot';
import { Scope } from './Scope';

export class User implements iEntity {
  private userId: string;
  private email: string;
  private name?: string | null;
  private lastName?: string | null;
  private roles?: string[];
  private scopes?: Array<Scope>;

  constructor(data: {
    userId: string
    email: string
    name?: string | null
    lastName?: string | null
    roles?: string[]
    scopes?: Array<Scope>
  }) {
    this.userId = data.userId;
    this.email = data.email;
    this.name = data.name;
    this.lastName = data.lastName;
    this.roles = data.roles || [];
    this.scopes = data.scopes || [];
  }

  getFullName(): string {
    let fullname = this.name || '';
    if (this.lastName) fullname = fullname.concat(' ', this.lastName);
    return fullname.trim();
  }

  setScopes(scopes: Array<Scope>) {
    this.scopes = scopes;
  }

  get snapshot(): UserSnapshot {
    return {
      email: this.email,
      name: this.name,
      lastName: this.lastName,
      userId: this.userId,
      roles: this.roles,
      scopes: this.scopes,
    };
  }
}
