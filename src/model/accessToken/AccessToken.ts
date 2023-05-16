export type AccessTokenSnapshot = {
  user: any // eslint-disable-line
  scopes: any // eslint-disable-line
}
export class AccessToken {
  readonly user: any; // eslint-disable-line

  constructor(data: {
    user: any // eslint-disable-line
  }) {
    this.user = data.user;
  }
}
