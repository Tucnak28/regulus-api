import { AbstractApi } from '../../service/abstractApi.js';
import { getValueFromMap } from '../../service/xmlParserService.js';
import { WaterResponseData } from './waterSchemas.js';

export class WaterApi extends AbstractApi<WaterResponseData> {
  page = '/tv_tc.xml';

  generateResponse(schemaXmlMap: Map<string, string>, registryErrors: string[]): WaterResponseData {
    console.log('Successfully fetched `/water` data');
    const statuses = new Map<string, string>([
      [getValueFromMap(schemaXmlMap, 'waterStatusOffService', registryErrors)!, 'OFF - SERVICE'],
      [getValueFromMap(schemaXmlMap, 'waterStatusOff', registryErrors)!, 'OFF'],
      [getValueFromMap(schemaXmlMap, 'waterStatusOnSetback', registryErrors)!, 'ON-SETBACK'],
      [getValueFromMap(schemaXmlMap, 'waterStatusOnComfort', registryErrors)!, 'ON-COMFORT'],
    ]);

    return {
      name: getValueFromMap(schemaXmlMap, 'waterName', registryErrors),
      serviceEnabled: getValueFromMap(schemaXmlMap, 'waterServiceEnabled', registryErrors) === '1',
      state: getValueFromMap(schemaXmlMap, 'waterState', registryErrors) === '1',
      status: this.findFirstKey(statuses),
      switchingSensorTemperature: getValueFromMap(schemaXmlMap, 'waterSwitchingSensorTemperature', registryErrors),
      comfortTemperature: getValueFromMap(schemaXmlMap, 'waterComfortTemperature', registryErrors),
      setbackTemperature: getValueFromMap(schemaXmlMap, 'waterSetbackTemperature', registryErrors),
      requiredTemperature: getValueFromMap(schemaXmlMap, 'waterRequiredTemperature', registryErrors),
      thermalStoreStatus: getValueFromMap(schemaXmlMap, 'waterThermalStoreStatus', registryErrors) === '1',
      thermalStoreTemperature: getValueFromMap(schemaXmlMap, 'waterThermalStoreTemperature', registryErrors),
      useTimeProgramState: getValueFromMap(schemaXmlMap, 'waterUseTimeProgramState', registryErrors) === '1',
      useSecondPeriodState: getValueFromMap(schemaXmlMap, 'waterUseSecondPeriodState', registryErrors) === '1',
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
