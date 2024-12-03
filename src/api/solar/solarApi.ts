import { UpdateAbstractApi } from '../../service/updateAbstractApi.js';
import { getValueFromMap, parseXmlToMap } from '../../service/xmlParserService.js';
import { SolarRequestData, SolarResponseData } from './solarSchemas.js';

export class SolarApi extends UpdateAbstractApi<SolarRequestData, SolarResponseData> {
  page = '/zd_sol.xml';

  async getResponse(data: string): Promise<SolarResponseData> {
    console.log('Successfully fetched `/solar` data');
    const schemaXmlMap = await parseXmlToMap(data);
    return {
      panelTemperature: getValueFromMap(schemaXmlMap, 'solarPanelTemperature'),
      runningStatus: getValueFromMap(schemaXmlMap, 'solarRunningStatus') === '1',
      power: getValueFromMap(schemaXmlMap, 'solarPower'),
      consumer1: {
        serviceEnabled: getValueFromMap(schemaXmlMap, 'solarC1ServiceEnabled') === '1',
        state: getValueFromMap(schemaXmlMap, 'solarC1State') === '1',
        heating: getValueFromMap(schemaXmlMap, 'solarC1Heating') === '1',
        coolingTemperature: getValueFromMap(schemaXmlMap, 'solarC1CoolingTemperature'),
        maximumTemperature: getValueFromMap(schemaXmlMap, 'solarC1MaximumTemperature'),
        requiredTemperature: getValueFromMap(schemaXmlMap, 'solarC1RequiredTemperature'),
      },
      consumer2: {
        serviceEnabled: getValueFromMap(schemaXmlMap, 'solarC2ServiceEnabled') === '1',
        state: getValueFromMap(schemaXmlMap, 'solarC2State') === '1',
        heating: getValueFromMap(schemaXmlMap, 'solarC2Heating') === '1',
        coolingTemperature: getValueFromMap(schemaXmlMap, 'solarC2CoolingTemperature'),
        maximumTemperature: getValueFromMap(schemaXmlMap, 'solarC2MaximumTemperature'),
        requiredTemperature: getValueFromMap(schemaXmlMap, 'solarC2RequiredTemperature'),
      },
      consumer3: {
        serviceEnabled: getValueFromMap(schemaXmlMap, 'solarC3ServiceEnabled') === '1',
        state: getValueFromMap(schemaXmlMap, 'solarC3State') === '1',
        heating: getValueFromMap(schemaXmlMap, 'solarC3Heating') === '1',
        coolingTemperature: getValueFromMap(schemaXmlMap, 'solarC3CoolingTemperature'),
        maximumTemperature: getValueFromMap(schemaXmlMap, 'solarC3MaximumTemperature'),
        requiredTemperature: getValueFromMap(schemaXmlMap, 'solarC3RequiredTemperature'),
      },
      pumpStatus: getValueFromMap(schemaXmlMap, 'solarPumpStatus'),
    };
  }
}
