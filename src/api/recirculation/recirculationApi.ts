import { AbstractApi } from '../../service/abstractApi';
import { RecirculationResponseHandler } from './recirculationResponseHandler';

export class RecirculationApi extends AbstractApi {
  page = '/tv_c.xml';
  handler = new RecirculationResponseHandler();
}
