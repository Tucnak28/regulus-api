import { AbstractApi } from '../../service/abstractApi.js';
import { getValueFromMap } from '../../service/xmlParserService.js';
import { HomeResponseData } from './homeSchemas.js';

export class HomeApi extends AbstractApi<HomeResponseData> {
  page = '/home.xml';

  generateResponse(schemaXmlMap: Map<string, string>, registryErrors: string[]): HomeResponseData {
    console.log('Successfully fetched `/home` data');
    return {
      outdoorTemperature: getValueFromMap(schemaXmlMap, 'outdoorTemperature', registryErrors),
    };
  }
}
