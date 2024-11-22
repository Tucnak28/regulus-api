import { AbstractApi } from '../../service/abstractApi';
import { Zone2ResponseHandler } from './zone2ResponseHandler';

export class Zone2Api extends AbstractApi {
  page = '/zo_z2.xml';
  handler = new Zone2ResponseHandler();
}
