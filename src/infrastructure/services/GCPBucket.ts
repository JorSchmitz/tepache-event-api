import { Bucket, Storage,  } from '@google-cloud/storage';
import {isEmpty} from 'lodash';
import * as dayjs from 'dayjs';

export class GCPBucket {

  private projectId: string;
  private bucketName: string;
  private bucket: Bucket;
  private filePath: string;

  constructor() {
    this.projectId = process.env.PROJECT_ID || '';
    if (this.projectId === 'undefined') throw new Error('ProjectId its needed to create the GCPBucket');
    const storage = new Storage({
      projectId: this.projectId
    });
    this.bucketName = process.env.GCS_BUCKET ||'';
    this.bucket = storage.bucket(this.bucketName);
    this.filePath = '';
  }
  setUserUploadConfiguration(fileType: string, client_uuid: string): void {
    if (fileType === 'PDF_UPLOAD') {
      this.filePath = `files/${client_uuid}/`;
    }
  }
  async uploadFileFromDisk(fileLocalroute: string, filename: string, contentType: string): Promise<string> {
    if (isEmpty(this.filePath) || !filename || !contentType) throw new Error('The url needs to be defined(the configuration method) in uploadFileFromDisk');
    await this.bucket.upload(fileLocalroute, {
      destination: `${this.filePath}${filename}`,
      gzip: true,
      metadata: {
        contentType: contentType || 'jpeg',
        cacheControl: 'public, max-age=31536000',
      },
    });
    return `${this.filePath}${filename}`;
  }
  async signUrl(path: string): Promise<string> {
    try {
      const expirationTimeInSeconds = 1800;
      const signedUrlPayload = {
        action: 'read' as 'read' | 'write' | 'delete' | 'resumable',
        expires: dayjs.utc().add(expirationTimeInSeconds, 'seconds').toDate()
      };
      const [link] = await this.bucket.file(path).getSignedUrl(signedUrlPayload);
      return link;
    } catch(e) {
      throw new Error(e);
    }
  }
  async signDownloadUrl(path: string): Promise<string> {
    try {
      const expirationTimeInSeconds = 1800;
      const signedUrlPayload = {
        action: 'read' as 'read' | 'write' | 'delete' | 'resumable',
        expires: dayjs.utc().add(expirationTimeInSeconds, 'seconds').toDate(),
        responseDisposition: 'attachment',
      };
      const [link] = await this.bucket.file(path).getSignedUrl(signedUrlPayload);
      return link;
    } catch(e) {
      throw new Error(e);
    }
  }
}  