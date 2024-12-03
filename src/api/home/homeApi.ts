import { AbstractApi } from '../../service/abstractApi.js';
import { getValueFromMap, parseXmlToMap } from '../../service/xmlParserService.js';
import { HomeResponseData } from './homeSchemas.js';

export class HomeApi extends AbstractApi<HomeResponseData> {
  page = '/home.xml';

  async getResponse(data: string): Promise<HomeResponseData> {
    console.log('Successfully fetched `/home` data');
    const schemaXmlMap = await parseXmlToMap(data);
    return {
      outdoorTemperature: getValueFromMap(schemaXmlMap, 'outdoorTemperature'),
    };
  }
}
