import { Response, NextFunction } from 'express';
import { AbstractApi } from '../../service/abstractApi.js';
import { getValueFromMap } from '../../service/xmlParserService.js';
import { CustomResponseData } from './customSchemas.js'; // Import the custom schema

export class CustomApi extends AbstractApi<CustomResponseData> {
  page = '/home.xml'; // Adjust the XML path for the custom route

  generateResponse(schemaXmlMap: Map<string, string>, registryErrors: string[]): CustomResponseData {
    // Update return type
    console.log('Successfully fetched `/custom` data');

    return {
      outdoorTemperature: getValueFromMap(schemaXmlMap, 'outdoorTemperature', registryErrors),
    };
  }
}
