import { AbstractApi } from '../../service/abstractApi.js';
import { getValueFromMap, parseXmlToMap } from '../../service/xmlParserService.js';
import { WaterResponseData } from './waterSchemas.js';

export class WaterApi extends AbstractApi<WaterResponseData> {
  page = '/tv_tc.xml';

  async getResponse(data: string): Promise<WaterResponseData> {
    console.log('Successfully fetched `/water` data');
    const schemaXmlMap = await parseXmlToMap(data);
    const statuses = new Map<string, string>([
      [getValueFromMap(schemaXmlMap, 'waterStatusOffService')!, 'OFF - SERVICE'],
      [getValueFromMap(schemaXmlMap, 'waterStatusOff')!, 'OFF'],
      [getValueFromMap(schemaXmlMap, 'waterStatusOnSetback')!, 'ON-SETBACK'],
      [getValueFromMap(schemaXmlMap, 'waterStatusOnComfort')!, 'ON-COMFORT'],
    ]);

    return {
      name: getValueFromMap(schemaXmlMap, 'waterName'),
      serviceEnabled: getValueFromMap(schemaXmlMap, 'waterServiceEnabled') === '1',
      state: getValueFromMap(schemaXmlMap, 'waterState') === '1',
      status: this.findFirstKey(statuses),
      switchingSensorTemperature: getValueFromMap(schemaXmlMap, 'waterSwitchingSensorTemperature'),
      comfortTemperature: getValueFromMap(schemaXmlMap, 'waterComfortTemperature'),
      setbackTemperature: getValueFromMap(schemaXmlMap, 'waterSetbackTemperature'),
      requiredTemperature: getValueFromMap(schemaXmlMap, 'waterRequiredTemperature'),
      thermalStoreStatus: getValueFromMap(schemaXmlMap, 'waterThermalStoreStatus') === '1',
      thermalStoreTemperature: getValueFromMap(schemaXmlMap, 'waterThermalStoreTemperature'),
      useTimeProgramState: getValueFromMap(schemaXmlMap, 'waterUseTimeProgramState') === '1',
      useSecondPeriodState: getValueFromMap(schemaXmlMap, 'waterUseSecondPeriodState') === '1',
    };
  }

  private findFirstKey(map: Map<string, string>): string | undefined {
    for (const [key, value] of map) {
      if (key === '1') {
        return value;
      }
    }
    return undefined;
  }
}
