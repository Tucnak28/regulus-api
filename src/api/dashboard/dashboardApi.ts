import { AbstractApi } from '../../service/abstractApi.js';
import { getValueFromMap } from '../../service/xmlParserService.js';
import { DashboardResponseData } from './dashboardSchemas.js';

export class DashboardApi extends AbstractApi<DashboardResponseData> {
  page = '/1_sch.xml';

  generateResponse(schemaXmlMap: Map<string, string>, registryErrors: string[]): DashboardResponseData {
    console.log('Successfully fetched `/dashboard` data');
    return {
      /*outdoorTemperature: getValueFromMap(schemaXmlMap, 'outdoorTemperature', registryErrors),
      rcTariff: getValueFromMap(schemaXmlMap, 'rcTariff', registryErrors) == '1' ? 'LOW' : 'HIGH',
      holiday: getValueFromMap(schemaXmlMap, 'holiday', registryErrors) == '1' ? 'ON' : 'OFF',
      heatPump: {
        runningStatus: getValueFromMap(schemaXmlMap, 'heatPumpRunningStatus', registryErrors) !== '0',
        outletTemperature: getValueFromMap(schemaXmlMap, 'heatPumpOutletTemperature', registryErrors),
        inletTemperature: getValueFromMap(schemaXmlMap, 'heatPumpInletTemperature', registryErrors),
      },
      zone1: {
        status: getValueFromMap(schemaXmlMap, 'zone1RunningStatus', registryErrors) !== '0',
        actualTemperature: getValueFromMap(schemaXmlMap, 'zone1Temperature', registryErrors),
        requiredTemperature: getValueFromMap(schemaXmlMap, 'zone1RequiredTemperature', registryErrors),
        actualHeatingWaterTemperature: getValueFromMap(schemaXmlMap, 'zone1HeatingWaterTemperature', registryErrors),
        requiredHeatingWaterTemperature: getValueFromMap(
          schemaXmlMap,
          'zone1RequiredHeatingWaterTemperature',
          registryErrors,
        ),
      },
      zone2: {
        status: getValueFromMap(schemaXmlMap, 'zone2RunningStatus', registryErrors) !== '0',
        actualTemperature: getValueFromMap(schemaXmlMap, 'zone2Temperature', registryErrors),
        requiredTemperature: getValueFromMap(schemaXmlMap, 'zone2RequiredTemperature', registryErrors),
        actualHeatingWaterTemperature: getValueFromMap(schemaXmlMap, 'zone2HeatingWaterTemperature', registryErrors),
        requiredHeatingWaterTemperature: getValueFromMap(
          schemaXmlMap,
          'zone2RequiredHeatingWaterTemperature',
          registryErrors,
        ),
      },*/
      aku: {
        //status: getValueFromMap(schemaXmlMap, 'akuRunningStatusFromHeatPump', registryErrors) === '1',
        //topTemperature: getValueFromMap(schemaXmlMap, 'akuTopTemperature', registryErrors),
        bottomTemperature: getValueFromMap(schemaXmlMap, 'akuBottomTemperature', registryErrors),
        requiredTemperature: getValueFromMap(schemaXmlMap, 'akuRequiredTemperature', registryErrors),
      },
      water: {
        //status: getValueFromMap(schemaXmlMap, 'waterRunningStatusFromHeatPump', registryErrors) === '1',
        actualTemperature: getValueFromMap(schemaXmlMap, 'waterSwitchingSensorTemperature', registryErrors),
        requiredTemperature: getValueFromMap(schemaXmlMap, 'waterRequiredTemperature', registryErrors),
      } /*
      solar: {
        status: getValueFromMap(schemaXmlMap, 'solarRunningStatus', registryErrors) === '1',
        panelTemperature: getValueFromMap(schemaXmlMap, 'solarPanelTemperature', registryErrors),
      },
      circulation: {
        status: getValueFromMap(schemaXmlMap, 'circulationRunningStatus', registryErrors) === '1',
      },*/,
    };
  }
}
