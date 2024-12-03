import { AbstractApi } from '../../service/abstractApi.js';
import { getValueFromMap, parseXmlToMap } from '../../service/xmlParserService.js';
import { HeatPumpResponseData } from './heatPumpSchemas.js';

export class HeatPumpApi extends AbstractApi<HeatPumpResponseData> {
  page = '/zd_t.xml';

  async getResponse(data: string): Promise<HeatPumpResponseData> {
    console.log('Successfully fetched `/heatPump` data');
    const schemaXmlMap = await parseXmlToMap(data);
    return {
      serviceEnabled: getValueFromMap(schemaXmlMap, 'hpServiceEnabled') === '1',
      status: getValueFromMap(schemaXmlMap, 'hpStatus'),
      compressor: getValueFromMap(schemaXmlMap, 'hpCompressor') == '1' ? 'RUNNING' : 'STOPPED',
      outletTemperature: getValueFromMap(schemaXmlMap, 'hpOutletTemperature'),
      inletTemperature: getValueFromMap(schemaXmlMap, 'hpInletTemperature'),
      runningStatus: getValueFromMap(schemaXmlMap, 'hpRunningStatus') === '1',
      runningTime: getValueFromMap(schemaXmlMap, 'hpRunningTime'),
      idleTime: getValueFromMap(schemaXmlMap, 'hpIdleTime'),
      overallStatistics: {
        totalHours: getValueFromMap(schemaXmlMap, 'overallTotalHours'),
        totalStarts: getValueFromMap(schemaXmlMap, 'overallTotalStarts'),
        todayHours: getValueFromMap(schemaXmlMap, 'overallTodayHours'),
        todayMinutes: getValueFromMap(schemaXmlMap, 'overallTodayMinutes'),
        todayStarts: getValueFromMap(schemaXmlMap, 'overallTodayStarts'),
        yesterdayHours: getValueFromMap(schemaXmlMap, 'overallYesterdayHours'),
        yesterdayMinutes: getValueFromMap(schemaXmlMap, 'overallYesterdayMinutes'),
        yesterdayStarts: getValueFromMap(schemaXmlMap, 'overallYesterdayStarts'),
      },
      hotWaterStatistics: {
        totalHours: getValueFromMap(schemaXmlMap, 'hotWaterTotalHours'),
        totalStarts: getValueFromMap(schemaXmlMap, 'hotWaterTotalStarts'),
        todayHours: getValueFromMap(schemaXmlMap, 'hotWaterTodayHours'),
        todayMinutes: getValueFromMap(schemaXmlMap, 'hotWaterTodayMinutes'),
        todayStarts: getValueFromMap(schemaXmlMap, 'hotWaterTodayStarts'),
        yesterdayHours: getValueFromMap(schemaXmlMap, 'hotWaterYesterdayHours'),
        yesterdayMinutes: getValueFromMap(schemaXmlMap, 'hotWaterYesterdayMinutes'),
        yesterdayStarts: getValueFromMap(schemaXmlMap, 'hotWaterYesterdayStarts'),
      },
    };
  }
}
