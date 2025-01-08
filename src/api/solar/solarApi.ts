import { UpdateAbstractApi } from '../../service/updateAbstractApi.js';
import { getValueFromMap } from '../../service/xmlParserService.js';
import { SolarRequestData, SolarResponseData } from './solarSchemas.js';

export class SolarApi extends UpdateAbstractApi<SolarRequestData, SolarResponseData> {
  page = '/zd_sol.xml';

  generateResponse(schemaXmlMap: Map<string, string>, registryErrors: string[]): SolarResponseData {
    console.log('Successfully fetched `/solar` data');
    return {
      panelTemperature: getValueFromMap(schemaXmlMap, 'solarPanelTemperature', registryErrors),
      runningStatus: getValueFromMap(schemaXmlMap, 'solarRunningStatus', registryErrors) === '1',
      power: getValueFromMap(schemaXmlMap, 'solarPower', registryErrors),
      consumer1: {
        serviceEnabled: getValueFromMap(schemaXmlMap, 'solarC1ServiceEnabled', registryErrors) === '1',
        state: getValueFromMap(schemaXmlMap, 'solarC1State', registryErrors) === '1',
        heating: getValueFromMap(schemaXmlMap, 'solarC1Heating', registryErrors) === '1',
        coolingTemperature: getValueFromMap(schemaXmlMap, 'solarC1CoolingTemperature', registryErrors),
        maximumTemperature: getValueFromMap(schemaXmlMap, 'solarC1MaximumTemperature', registryErrors),
        requiredTemperature: getValueFromMap(schemaXmlMap, 'solarC1RequiredTemperature', registryErrors),
      },
      consumer2: {
        serviceEnabled: getValueFromMap(schemaXmlMap, 'solarC2ServiceEnabled', registryErrors) === '1',
        state: getValueFromMap(schemaXmlMap, 'solarC2State', registryErrors) === '1',
        heating: getValueFromMap(schemaXmlMap, 'solarC2Heating', registryErrors) === '1',
        coolingTemperature: getValueFromMap(schemaXmlMap, 'solarC2CoolingTemperature', registryErrors),
        maximumTemperature: getValueFromMap(schemaXmlMap, 'solarC2MaximumTemperature', registryErrors),
        requiredTemperature: getValueFromMap(schemaXmlMap, 'solarC2RequiredTemperature', registryErrors),
      },
      consumer3: {
        serviceEnabled: getValueFromMap(schemaXmlMap, 'solarC3ServiceEnabled', registryErrors) === '1',
        state: getValueFromMap(schemaXmlMap, 'solarC3State', registryErrors) === '1',
        heating: getValueFromMap(schemaXmlMap, 'solarC3Heating', registryErrors) === '1',
        coolingTemperature: getValueFromMap(schemaXmlMap, 'solarC3CoolingTemperature', registryErrors),
        maximumTemperature: getValueFromMap(schemaXmlMap, 'solarC3MaximumTemperature', registryErrors),
        requiredTemperature: getValueFromMap(schemaXmlMap, 'solarC3RequiredTemperature', registryErrors),
      },
      pumpStatus: getValueFromMap(schemaXmlMap, 'solarPumpStatus', registryErrors),
    };
  }
}
