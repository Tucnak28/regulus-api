import { AbstractApi } from '../../service/abstractApi';
import { Zone1ResponseHandler } from './zone1ResponseHandler';

export class Zone1Api extends AbstractApi {
  page = '/zo_z1.xml';
  handler = new Zone1ResponseHandler();
}
