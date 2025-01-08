import { AbstractApi } from '../../service/abstractApi.js';
import { getValueFromMap } from '../../service/xmlParserService.js';
import { RecirculationResponseData } from './recirculationSchemas.js';

export class RecirculationApi extends AbstractApi<RecirculationResponseData> {
  page = '/tv_c.xml';

  generateResponse(schemaXmlMap: Map<string, string>, registryErrors: string[]): RecirculationResponseData {
    console.log('Successfully fetched `/recirculation` data');
    return {
      serviceEnabled: getValueFromMap(schemaXmlMap, 'recirculationServiceEnabled', registryErrors) === '1',
      state: getValueFromMap(schemaXmlMap, 'recirculationState', registryErrors) === '1',
      period: getValueFromMap(schemaXmlMap, 'recirculationPeriod', registryErrors),
      delay: getValueFromMap(schemaXmlMap, 'recirculationDelay', registryErrors),
      immediatePeriod: getValueFromMap(schemaXmlMap, 'recirculationImmediatePeriod', registryErrors),
      immediateState: getValueFromMap(schemaXmlMap, 'recirculationImmediateState', registryErrors) === '1',
      useTimeProgramState: getValueFromMap(schemaXmlMap, 'recirculationUseTimeProgramState', registryErrors) === '1',
      useSecondPeriodState: getValueFromMap(schemaXmlMap, 'recirculationUseSecondPeriodState', registryErrors) === '1',
    };
  }
}
