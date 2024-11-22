import { AbstractApi } from '../../service/abstractApi';
import { HeatPumpResponseHandler } from './heatPumpResponseHandler';

export class HeatPumpApi extends AbstractApi {
  page = '/zd_t.xml';
  handler = new HeatPumpResponseHandler();
}
