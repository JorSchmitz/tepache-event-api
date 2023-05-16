import { iEntity } from '../../infrastructure/iEntity';
import { LinkSnapshot } from './LinkSnapshot';


export class Link implements iEntity {
  private uuid: string;
  private createdAt: Date;
  private updatedAt: Date;
  private description: string;
  private url: string;

  constructor(data: {
    uuid: string;
    createdAt: Date;
    updatedAt: Date;
    description: string;
    url: string;
  }) {
    this.uuid = data.uuid;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.description = data.description;
    this.url = data.url;
  }

  get snapshot(): LinkSnapshot {
    return {
      uuid: this.uuid,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      description: this.description,
      url: this.url,
    };
  }
}
