import { iSnapshot } from '../../infrastructure/iSnapshot';
import { Scope } from './Scope';

export type UserSnapshot = iSnapshot & {
  email: string,
  name?: string | null
  lastName?: string | null
  userId: string
  roles?: string[]
  scopes?: Array<Scope>
}
