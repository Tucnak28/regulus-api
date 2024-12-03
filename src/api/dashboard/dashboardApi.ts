import { AbstractApi } from '../../service/abstractApi.js';
import { getValueFromMap, parseXmlToMap } from '../../service/xmlParserService.js';
import { DashboardResponseData } from './dashboardSchemas.js';

export class DashboardApi extends AbstractApi<DashboardResponseData> {
  page = '/1_sch.xml';

  async getResponse(data: string): Promise<DashboardResponseData> {
    console.log('Successfully fetched `/dashboard` data');
    const schemaXmlMap = await parseXmlToMap(data);
    return {
      outdoorTemperature: getValueFromMap(schemaXmlMap, 'outdoorTemperature'),
      rcTariff: getValueFromMap(schemaXmlMap, 'rcTariff') == '1' ? 'LOW' : 'HIGH',
      holiday: getValueFromMap(schemaXmlMap, 'holiday') == '1' ? 'ON' : 'OFF',
      heatPump: {
        runningStatus: getValueFromMap(schemaXmlMap, 'heatPumpRunningStatus') !== '0',
        outletTemperature: getValueFromMap(schemaXmlMap, 'heatPumpOutletTemperature'),
        inletTemperature: getValueFromMap(schemaXmlMap, 'heatPumpInletTemperature'),
      },
      zone1: {
        status: getValueFromMap(schemaXmlMap, 'zone1RunningStatus') !== '0',
        actualTemperature: getValueFromMap(schemaXmlMap, 'zone1Temperature'),
        requiredTemperature: getValueFromMap(schemaXmlMap, 'zone1RequiredTemperature'),
        actualHeatingWaterTemperature: getValueFromMap(schemaXmlMap, 'zone1HeatingWaterTemperature'),
        requiredHeatingWaterTemperature: getValueFromMap(schemaXmlMap, 'zone1RequiredHeatingWaterTemperature'),
      },
      zone2: {
        status: getValueFromMap(schemaXmlMap, 'zone2RunningStatus') !== '0',
        actualTemperature: getValueFromMap(schemaXmlMap, 'zone2Temperature'),
        requiredTemperature: getValueFromMap(schemaXmlMap, 'zone2RequiredTemperature'),
        actualHeatingWaterTemperature: getValueFromMap(schemaXmlMap, 'zone2HeatingWaterTemperature'),
        requiredHeatingWaterTemperature: getValueFromMap(schemaXmlMap, 'zone2RequiredHeatingWaterTemperature'),
      },
      aku: {
        status: getValueFromMap(schemaXmlMap, 'akuRunningStatusFromHeatPump') === '1',
        topTemperature: getValueFromMap(schemaXmlMap, 'akuTopTemperature'),
        bottomTemperature: getValueFromMap(schemaXmlMap, 'akuBottomTemperature'),
        requiredTemperature: getValueFromMap(schemaXmlMap, 'akuRequiredTemperature'),
      },
      water: {
        status: getValueFromMap(schemaXmlMap, 'waterRunningStatusFromHeatPump') === '1',
        actualTemperature: getValueFromMap(schemaXmlMap, 'waterSwitchingSensorTemperature'),
        requiredTemperature: getValueFromMap(schemaXmlMap, 'waterRequiredTemperature'),
      },
      solar: {
        status: getValueFromMap(schemaXmlMap, 'solarRunningStatus') === '1',
        panelTemperature: getValueFromMap(schemaXmlMap, 'solarPanelTemperature'),
      },
      circulation: {
        status: getValueFromMap(schemaXmlMap, 'circulationRunningStatus') === '1',
      },
    };
  }
}
