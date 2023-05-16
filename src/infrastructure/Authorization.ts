import { isEmpty } from 'lodash';

export class Authorization {
  static getTokenFromHeaders(request: any): string | null { // eslint-disable-line
    if (Reflect.has(request.headers, 'authorization')) {
      return request.get('Authorization').split('Bearer ').pop();
    }
    return null;
  }
  static getDeviceIdFromHeaders(request: any): string | null { // eslint-disable-line
    const deviceId = request.get('device-id');
    if (isEmpty(deviceId)) return null;
    return deviceId;
  }
}
