import { AbstractApi } from '../../service/abstractApi.js';
import { getValueFromMap } from '../../service/xmlParserService.js';
import { HeatPumpResponseData } from './heatPumpSchemas.js';

export class HeatPumpApi extends AbstractApi<HeatPumpResponseData> {
  page = '/zd_t.xml';

  generateResponse(schemaXmlMap: Map<string, string>, registryErrors: string[]): HeatPumpResponseData {
    console.log('Successfully fetched `/heatPump` data');
    return {
      serviceEnabled: getValueFromMap(schemaXmlMap, 'hpServiceEnabled', registryErrors) === '1',
      status: getValueFromMap(schemaXmlMap, 'hpStatus', registryErrors),
      compressor: getValueFromMap(schemaXmlMap, 'hpCompressor', registryErrors) == '1' ? 'RUNNING' : 'STOPPED',
      outletTemperature: getValueFromMap(schemaXmlMap, 'hpOutletTemperature', registryErrors),
      inletTemperature: getValueFromMap(schemaXmlMap, 'hpInletTemperature', registryErrors),
      runningStatus: getValueFromMap(schemaXmlMap, 'hpRunningStatus', registryErrors) === '1',
      runningTime: getValueFromMap(schemaXmlMap, 'hpRunningTime', registryErrors),
      idleTime: getValueFromMap(schemaXmlMap, 'hpIdleTime', registryErrors),
      overallStatistics: {
        totalHours: getValueFromMap(schemaXmlMap, 'overallTotalHours', registryErrors),
        totalStarts: getValueFromMap(schemaXmlMap, 'overallTotalStarts', registryErrors),
        todayHours: getValueFromMap(schemaXmlMap, 'overallTodayHours', registryErrors),
        todayMinutes: getValueFromMap(schemaXmlMap, 'overallTodayMinutes', registryErrors),
        todayStarts: getValueFromMap(schemaXmlMap, 'overallTodayStarts', registryErrors),
        yesterdayHours: getValueFromMap(schemaXmlMap, 'overallYesterdayHours', registryErrors),
        yesterdayMinutes: getValueFromMap(schemaXmlMap, 'overallYesterdayMinutes', registryErrors),
        yesterdayStarts: getValueFromMap(schemaXmlMap, 'overallYesterdayStarts', registryErrors),
      },
      hotWaterStatistics: {
        totalHours: getValueFromMap(schemaXmlMap, 'hotWaterTotalHours', registryErrors),
        totalStarts: getValueFromMap(schemaXmlMap, 'hotWaterTotalStarts', registryErrors),
        todayHours: getValueFromMap(schemaXmlMap, 'hotWaterTodayHours', registryErrors),
        todayMinutes: getValueFromMap(schemaXmlMap, 'hotWaterTodayMinutes', registryErrors),
        todayStarts: getValueFromMap(schemaXmlMap, 'hotWaterTodayStarts', registryErrors),
        yesterdayHours: getValueFromMap(schemaXmlMap, 'hotWaterYesterdayHours', registryErrors),
        yesterdayMinutes: getValueFromMap(schemaXmlMap, 'hotWaterYesterdayMinutes', registryErrors),
        yesterdayStarts: getValueFromMap(schemaXmlMap, 'hotWaterYesterdayStarts', registryErrors),
      },
    };

  }
}
