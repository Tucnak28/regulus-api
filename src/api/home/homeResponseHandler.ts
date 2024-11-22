import { getValueFromMap, parseXmlToMap } from '../../service/xmlParserService';
import { ResponseHandler } from '../../service/responseHandler';
import { HomeResponseData } from './homeSchemas';

export class HomeResponseHandler implements ResponseHandler {
  async getResponseData(data: string): Promise<HomeResponseData> {
    console.log('Successfully fetched `/home` data');
    const schemaXmlMap = await parseXmlToMap(data);
    return {
      outdoorTemperature: getValueFromMap(schemaXmlMap, 'outdoorTemperature'),
    };
  }
}
