import { AbstractApi } from '../../service/abstractApi';
import { WaterResponseHandler } from './waterResponseHandler';

export class WaterApi extends AbstractApi {
  page = '/tv_tc.xml';
  handler = new WaterResponseHandler();
}
