export class Scope {
  readonly name: string;
  readonly resource: string;
  readonly permission: string;
  
  constructor(data: {
    name: string,
  }) {
    const [permission, resource] = data.name.split(':');
    this.permission = permission;
    this.resource = resource;
    this.name = data.name;
  }
}