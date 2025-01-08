import { UpdateAbstractApi } from '../../service/updateAbstractApi.js';
import { getValueFromMap } from '../../service/xmlParserService.js';
import { Zone2RequestData, Zone2ResponseData } from './zone2Schemas.js';

export class Zone2Api extends UpdateAbstractApi<Zone2RequestData, Zone2ResponseData> {
  page = '/zo_z2.xml';

  generateResponse(schemaXmlMap: Map<string, string>, registryErrors: string[]): Zone2ResponseData {
    console.log('Successfully fetched `/zone2` data');
    return {
      name: getValueFromMap(schemaXmlMap, 'zone2Name', registryErrors),
      serviceEnabled: getValueFromMap(schemaXmlMap, 'zone2ServiceEnabled', registryErrors) === '1',
      status: getValueFromMap(schemaXmlMap, 'zone2Status', registryErrors),
      statusReason: getValueFromMap(schemaXmlMap, 'zone2StatusReason', registryErrors),
      temperature: getValueFromMap(schemaXmlMap, 'zone2Temperature', registryErrors),
      requiredTemperature: getValueFromMap(schemaXmlMap, 'zone2RequiredTemperature', registryErrors),
      heatingWaterTemperature: getValueFromMap(schemaXmlMap, 'zone2HeatingWaterTemperature', registryErrors),
      requiredHeatingWaterTemperature: getValueFromMap(schemaXmlMap, 'zone2RequiredHeatingWaterTemperature', registryErrors),
      winterSummerModeByDateState: getValueFromMap(schemaXmlMap, 'zone2WinterSummerModeByDateState', registryErrors) === '1',
      winterSummerModeByTemperatureState:
        getValueFromMap(schemaXmlMap, 'zone2WinterSummerModeByTemperatureState', registryErrors) === '1',
      humidityState: getValueFromMap(schemaXmlMap, 'zone2HumidityState', registryErrors),
      humidity: getValueFromMap(schemaXmlMap, 'zone2Humidity', registryErrors),
    };
  }
}
