import { getValueFromMap, parseXmlToMap } from '../../service/xmlParserService';
import { ResponseHandler } from '../../service/responseHandler';
import { Zone2ResponseData } from './zone2Schemas';

export class Zone2ResponseHandler implements ResponseHandler {
  async getResponseData(data: string): Promise<Zone2ResponseData> {
    console.log('Successfully fetched `/zone2` data');
    const schemaXmlMap = await parseXmlToMap(data);
    return {
      name: getValueFromMap(schemaXmlMap, 'zone2Name'),
      serviceEnabled: getValueFromMap(schemaXmlMap, 'zone2ServiceEnabled') === '1',
      status: getValueFromMap(schemaXmlMap, 'zone2Status'),
      statusReason: getValueFromMap(schemaXmlMap, 'zone2StatusReason'),
      temperature: getValueFromMap(schemaXmlMap, 'zone2Temperature'),
      requiredTemperature: getValueFromMap(schemaXmlMap, 'zone2RequiredTemperature'),
      heatingWaterTemperature: getValueFromMap(schemaXmlMap, 'zone2HeatingWaterTemperature'),
      requiredHeatingWaterTemperature: getValueFromMap(schemaXmlMap, 'zone2RequiredHeatingWaterTemperature'),
      winterSummerModeByDateState: getValueFromMap(schemaXmlMap, 'zone2WinterSummerModeByDateState') === '1',
      winterSummerModeByTemperatureState:
        getValueFromMap(schemaXmlMap, 'zone2WinterSummerModeByTemperatureState') === '1',
      humidityState: getValueFromMap(schemaXmlMap, 'zone2HumidityState'),
      humidity: getValueFromMap(schemaXmlMap, 'zone2Humidity'),
    };
  }
}
