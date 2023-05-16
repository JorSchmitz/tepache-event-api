import { Authorization } from '../Authorization';
import { TokenDecoder } from '../services/TokenDecoder';
import { UserFactory } from '../factories/UserFactory';
import { User } from '../../model/user/User';
import { Auth0Service } from '../services/Auth0Service';

export const getContext = (async (req: any) => { // eslint-disable-line
  const jwt = Authorization.getTokenFromHeaders(req);
  const deviceId = Authorization.getDeviceIdFromHeaders(req);
  if (!jwt) return { jwt, deviceId };
  const tokenIssuer = new TokenDecoder();
  let token = null;
  try {
    token = await tokenIssuer.decodeAccessToken(jwt);
  } catch (e) {} // eslint-disable-line
  return {
    jwt,
    deviceId,
    token,
  };
});

export const isAuthenticated = async (ctx: any) => { // eslint-disable-line
  if (!ctx.token) return false;

  const { user } = ctx.token;
  if (!user) return false;

  const userEntity = UserFactory.createFromAuth0({
    userId: user.sub,
    name: user.name,
    email: user.email,
    roles: user.userRoles,
    scopes: [],
  });
  ctx.user = userEntity;

  return true;
};

export const isAuthorized = async (ctx: any, permission:string[]) => { // eslint-disable-line
  const user: User = ctx.user;
  if (!user) return false;
  const auth0Service = new Auth0Service();
  const scopes = await auth0Service.getUserPermissions(user.snapshot.userId);
  const hasPermission = permission.every(value => {
    return scopes.find(scope => scope.name === value);
  });
  if(!hasPermission) return false;
  user.setScopes(scopes);
  ctx.user = user;
  return true;
};
