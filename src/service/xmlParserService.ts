import { registryMapper } from '../mapper/registryMapper';
import xml2js from 'xml2js';

export async function parseXmlToMap(xml: string): Promise<Map<string, string>> {
  return parseXml(getRegistryMap, xml);
}

export async function parseAcerValue(xml: string): Promise<string> {
  return parseXml(getAcerValue, xml);
}

async function getRegistryMap(parsed: any): Promise<Map<string, string>> {
  const map = new Map<string, string>();

  const inputs = parsed.PAGE.INPUT;
  const parsedInputs = Array.isArray(inputs) ? inputs : [inputs];

  parsedInputs.forEach((input) => {
    map.set(input.$?.NAME, input.$?.VALUE);
  });
  return map;
}

async function getAcerValue(parsed: any): Promise<string> {
  return parsed.LOGIN.ACER.$?.VALUE;
}

async function parseXml<T>(operation: (parsed: any) => Promise<T>, xml: string): Promise<T> {
  return new Promise((resolve, reject) => {
    const parser = new xml2js.Parser();
    parser.parseString(xml, async (err: any, result: any) => {
      if (err) {
        console.error('Error parsing XML:', err);
        reject(err);
        return;
      }

      try {
        const data = await operation(result);
        resolve(data);
      } catch (operationError) {
        console.error('Error during operation:', operationError);
        reject(operationError);
      }
    });
  });
}

export function getValueFromMap(responseMap: Map<string, string>, field: string): string | undefined {
  const registryName = registryMapper.get(field);
  if (registryName === undefined) {
    return console.log(`Property '${field}' is not assigned to any Regulus Registry name`), undefined;
  }
  const registryValue = responseMap.get(registryName);
  if (registryValue === undefined) {
    return (
      console.log(`Property '${field}' is assigned to registry '${registryName}', but is not found in response xml`),
      undefined
    );
  }
  return registryValue;
}
