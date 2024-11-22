import { AbstractApi } from '../../service/abstractApi';
import { DashboardResponseHandler } from './dashboardResponseHandler';

export class DashboardApi extends AbstractApi {
  page = '/1_sch.xml';
  handler = new DashboardResponseHandler();
}
