import { AbstractApi } from '../../service/abstractApi';
import { SolarResponseHandler } from './solarResponseHandler';

export class SolarApi extends AbstractApi {
  page = '/zd_sol.xml';
  handler = new SolarResponseHandler();
}
