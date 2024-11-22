import { HomeApi } from '../api/home/homeApi';
import { DashboardApi } from '../api/dashboard/dashboardApi';
import { SolarApi } from '../api/solar/solarApi';
import { HeatPumpApi } from '../api/heatPump/heatPumpApi';
import { Zone1Api } from '../api/zone1/zone1Api';
import { UnknownApiTypeError } from '../exception/unknownApiTypeError';
import { AbstractApi } from '../service/abstractApi';
import { ApiService } from '../service/apiService';

export class ApiFactory {
  static async redirectTo(redirect: string): Promise<any> {
    const apiService = new ApiService();

    const pageMapper = new Map<string, AbstractApi>([
      ['/home.xml', new HomeApi(apiService)],
      ['/1_sch.xml', new DashboardApi(apiService)],
      ['/zd_t.xml', new HeatPumpApi(apiService)],
      ['/zd_sol.xml', new SolarApi(apiService)],
      ['/zo_z1.xml', new Zone1Api(apiService)],
    ]);

    let apiInstance = pageMapper.get(redirect);
    if (!apiInstance) {
      throw new UnknownApiTypeError(redirect);
    }

    return await apiInstance.fetch();
  }
}
