import { getValueFromMap, parseXmlToMap } from '../../service/xmlParserService';
import { ResponseHandler } from '../../service/responseHandler';
import { DashboardResponseData } from './dashboardSchemas';

export class DashboardResponseHandler implements ResponseHandler {
  async getResponseData(data: string): Promise<DashboardResponseData> {
    console.log('Successfully fetched `/dashboard` data');
    const schemaXmlMap = await parseXmlToMap(data);
    return {
      outdoorTemperature: getValueFromMap(schemaXmlMap, 'outdoorTemperature'),
      rcTariff: getValueFromMap(schemaXmlMap, 'rcTariff') === '1',
      holiday: getValueFromMap(schemaXmlMap, 'holiday') === '1',
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
        actualTemperature: getValueFromMap(schemaXmlMap, 'waterTemperature'),
        requiredTemperature: getValueFromMap(schemaXmlMap, 'waterRequiredTemperature'),
      },
      solar: {
        status: getValueFromMap(schemaXmlMap, 'solarRunningStatus') === '1',
        panelTemperature: getValueFromMap(schemaXmlMap, 'solarPanelTemperature'),
      },
      circulation: {
        status: getValueFromMap(schemaXmlMap, 'circulationRunningStatus') === '1',
      },

      // outdoorTemperature: getValueFromMap(schemaXmlMap, 'outdoorTemperature'),
      // heatPumpRunningStatus: getValueFromMap(schemaXmlMap, 'heatPumpRunningStatus') !== '0',
      // outletTemperature: getValueFromMap(schemaXmlMap, 'outletTemperature'),
      // inletTemperature: getValueFromMap(schemaXmlMap, 'inletTemperature'),
      // zone1HeatingWaterTemperature: getValueFromMap(schemaXmlMap, 'zone1HeatingWaterTemperature'),
      // zone1RequiredHeatingWaterTemperature: getValueFromMap(schemaXmlMap, 'zone1RequiredHeatingWaterTemperature'),
      // zone1Temperature: getValueFromMap(schemaXmlMap, 'zone1Temperature'),
      // zone1RequiredTemperature: getValueFromMap(schemaXmlMap, 'zone1RequiredTemperature'),
      // zone1RunningStatus: getValueFromMap(schemaXmlMap, 'zone1RunningStatus') !== '0',
      // zone2HeatingTemperature: getValueFromMap(schemaXmlMap, 'zone2HeatingTemperature'),
      // zone2HeatingRequiredTemperature: getValueFromMap(schemaXmlMap, 'zone2HeatingRequiredTemperature'),
      // zone2Temperature: getValueFromMap(schemaXmlMap, 'zone2Temperature'),
      // zone2RequiredTemperature: getValueFromMap(schemaXmlMap, 'zone2RequiredTemperature'),
      // zone2RunningStatus: getValueFromMap(schemaXmlMap, 'zone2RunningStatus') !== '0',
      // akuTopTemperature: getValueFromMap(schemaXmlMap, 'akuTopTemperature'),
      // akuBottomTemperature: getValueFromMap(schemaXmlMap, 'akuBottomTemperature'),
      // akuRunningStatusFromHeatPump: getValueFromMap(schemaXmlMap, 'akuRunningStatusFromHeatPump') === '1',
      // waterTemperature: getValueFromMap(schemaXmlMap, 'waterTemperature'),
      // waterRequiredTemperature: getValueFromMap(schemaXmlMap, 'waterRequiredTemperature'),
      // waterRunningStatusFromHeatPump: getValueFromMap(schemaXmlMap, 'waterRunningStatusFromHeatPump') === '1',
      // solarTemperature: getValueFromMap(schemaXmlMap, 'solarTemperature'),
      // solarRunningStatus: getValueFromMap(schemaXmlMap, 'solarRunningStatus') === '1',
      // circulationRunningStatus: getValueFromMap(schemaXmlMap, 'circulationRunningStatus') === '1',
    };
  }
}
