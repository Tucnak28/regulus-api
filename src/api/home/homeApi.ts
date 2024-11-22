import { AbstractApi } from '../../service/abstractApi';
import { HomeResponseHandler } from './homeResponseHandler';

export class HomeApi extends AbstractApi {
  page = '/home.xml';
  handler = new HomeResponseHandler();
}
