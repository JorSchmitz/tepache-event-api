import jwt from 'jsonwebtoken';
import { JwksClient } from 'jwks-rsa';
import { AccessToken } from '../../model/accessToken/AccessToken';
import { InvalidTokenError } from '../../model/accessToken/InvalidTokenError';

let jwksClientSigningKey: string;
export const getJwksClientSigningKey = async () => {
  if (!jwksClientSigningKey) {
    jwksClientSigningKey = await new TokenDecoder().getJwksClientSigningKey();
  }

  return jwksClientSigningKey;
};

export class TokenDecoder {
  private readonly auth0_domain: string;
  private readonly auth0_cliend_id: string;
  private readonly auth0_audience: string;
  private readonly auth0_kid: string;

  private readonly audience: string;
  private readonly issuer: string;
  private readonly jwksUri: string;

  constructor() {
    this.auth0_domain = process.env.AUTH0_PROVIDER_DOMAIN || '';
    this.auth0_cliend_id = process.env.AUTH0_PROVIDER_CLIENT_ID || '';
    this.auth0_audience = process.env.AUTH0_PROVIDER_AUDIENCE || '';
    this.auth0_kid = process.env.AUTH0_PROVIDER_KID || '';

    this.audience = this.auth0_cliend_id;
    this.issuer = `https://${this.auth0_domain}/`;
    this.jwksUri = `https://${this.auth0_domain}/.well-known/jwks.json`;
  }

  async getJwksClientSigningKey(): Promise<string> {
    const client = new JwksClient({
      jwksUri: this.jwksUri,
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
    });
    const signedKey = await client.getSigningKey(this.auth0_kid);
    return signedKey.getPublicKey();
  }

  async decodeAccessToken(token: string): Promise<AccessToken> {
    try {
      const signedKey = await getJwksClientSigningKey();
      const data = jwt.verify(token, signedKey, {
        algorithms: ['RS256'],
        issuer: this.issuer,
        audience: this.audience,
      }) as any; // eslint-disable-line

      if (data.iss !== this.issuer) throw new Error('wrong issuer');
      if (data.is_refresh_token) throw new Error('wrong token');
      if (!data.sub) throw new Error('wrong data format');
      
      const accessToken = new AccessToken({
        user: data,
      });
      return accessToken;
    } catch(e) {
      throw new InvalidTokenError('invalid token', {
        component: 'decodeAccessToken',
        input: { error: e.message },
      });
    }
  }
}
