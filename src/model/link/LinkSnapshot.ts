import { iSnapshot } from '../../infrastructure/iSnapshot';

export type LinkSnapshot = iSnapshot & {
  uuid: string;
  description: string;
  url: string;
}
