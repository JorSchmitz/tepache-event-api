import { AppMetadata, ManagementClient, User, UserMetadata } from 'auth0';
import { Scope } from '../../model/user/Scope';

let managementClientInstance: ManagementClient | null = null;

export class Auth0Service {

  private domain: string;
  private clientId: string;
  private clientSecret: string;
  private managementClient: ManagementClient;

  constructor() {
    const domain = process.env.AUTH0_PROVIDER_DOMAIN_SCOPES as string;
    const clientId = process.env.AUTH0_PROVIDER_CLIENT_ID_SCOPES as string;
    const clientSecret = process.env.AUTH0_PROVIDER_CLIENT_SECRET_SCOPES as string;
    if(!managementClientInstance) {
      managementClientInstance = new ManagementClient({
        domain: domain,
        clientId: clientId,
        clientSecret: clientSecret,
      });
    }
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.domain = domain;
    this.managementClient = managementClientInstance;
  }

  async getUsersByRole(role: string) {
    const users = await this.managementClient.getUsers({
      q: `app_metadata.roles:"${role}"`, 
      search_engine: 'v3',
    });
    return users;
  }

  async getUserById(userId: string): Promise<User<AppMetadata, UserMetadata> | null> {
    const user = await this.managementClient.getUser({id: userId});
    if(!user) {
      return null;
    }
    return user;
  }

  async getUserPermissions(userId: string): Promise<Scope[]> {
    const management = new ManagementClient({
      domain: process.env.AUTH0_PROVIDER_DOMAIN as string,
      clientId: process.env.AUTH0_PROVIDER_CLIENT_ID_SCOPES as string,
      clientSecret: process.env.AUTH0_PROVIDER_CLIENT_SECRET_SCOPES as string,
    });
    const params =  { id : userId};
  
    try {
      const scopesFromAuth0 = await management.getUserPermissions(params);
      const scopes = scopesFromAuth0
        .map((scope) => {
          const name: string = scope.permission_name || '';
          return new Scope({ name: name });
        });
      return scopes;
    } catch (e) {
      return [];
    }
  }
}
