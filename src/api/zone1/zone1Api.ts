import { UpdateAbstractApi } from '../../service/updateAbstractApi.js';
import { getValueFromMap } from '../../service/xmlParserService.js';
import { Zone1RequestData, Zone1ResponseData } from './zone1Schemas.js';

export class Zone1Api extends UpdateAbstractApi<Zone1RequestData, Zone1ResponseData> {
  page = '/zo_z1.xml';

  generateResponse(schemaXmlMap: Map<string, string>, registryErrors: string[]): Zone1ResponseData {
    console.log('Successfully fetched `/zone1` data');
    return {
      name: getValueFromMap(schemaXmlMap, 'zone1Name', registryErrors),
      serviceEnabled: getValueFromMap(schemaXmlMap, 'zone1ServiceEnabled', registryErrors) === '1',
      status: getValueFromMap(schemaXmlMap, 'zone1Status', registryErrors),
      statusReason: getValueFromMap(schemaXmlMap, 'zone1StatusReason', registryErrors),
      temperature: getValueFromMap(schemaXmlMap, 'zone1Temperature', registryErrors),
      requiredTemperature: getValueFromMap(schemaXmlMap, 'zone1RequiredTemperature', registryErrors),
      heatingWaterTemperature: getValueFromMap(schemaXmlMap, 'zone1HeatingWaterTemperature', registryErrors),
      requiredHeatingWaterTemperature: getValueFromMap(schemaXmlMap, 'zone1RequiredHeatingWaterTemperature', registryErrors),
      winterSummerModeByDateState: getValueFromMap(schemaXmlMap, 'zone1WinterSummerModeByDateState', registryErrors) === '1',
      winterSummerModeByTemperatureState:
        getValueFromMap(schemaXmlMap, 'zone1WinterSummerModeByTemperatureState', registryErrors) === '1',
      humidityState: getValueFromMap(schemaXmlMap, 'zone1HumidityState', registryErrors),
      humidity: getValueFromMap(schemaXmlMap, 'zone1Humidity', registryErrors),
    };
  }
}
