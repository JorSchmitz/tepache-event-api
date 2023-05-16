import { ApolloError } from 'apollo-server-errors';

export class UserAlreadyExistsError extends ApolloError {
  constructor(message: string, data: { component: string, input?: Record<string, unknown> }) {
    const type = 'USER_ALREADY_EXISTS';
    super(message, type, { ...data });
  }
}

export class UserNotExistsError extends ApolloError {
  constructor(message: string, data: { component: string, input?: Record<string, unknown> }) {
    const type = 'USER_NOT_EXISTS';
    super(message, type, { ...data });
  }
}


