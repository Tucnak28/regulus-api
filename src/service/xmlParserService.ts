import { registryMapper } from '../mapper/registryMapper.js';
import xml2js from 'xml2js';

interface Input {
  $?: {
    NAME: string;
    VALUE: string;
  };
}

interface Page {
  INPUT: Input | Input[];
}

interface Acer {
  $?: {
    VALUE: string;
  };
}

interface Login {
  ACER: Acer;
}

interface ParsedXml {
  PAGE: Page;
  LOGIN: Login;
}

export async function parseXmlToMap(xml: string): Promise<Map<string, string>> {
  return parseXml(getRegistryMap, xml);
}

export async function parseAcerValue(xml: string): Promise<string> {
  return parseXml(getAcerValue, xml);
}

async function getRegistryMap(parsed: ParsedXml): Promise<Map<string, string>> {
  const map = new Map<string, string>();

  const inputs = parsed.PAGE.INPUT;
  const parsedInputs = Array.isArray(inputs) ? inputs : [inputs];

  parsedInputs.forEach((input) => {
    const name = input.$?.NAME || 'UNKNOWN';
    const value = input.$?.VALUE || '';
    map.set(name, value);
  });
  return map;
}

async function getAcerValue(parsed: ParsedXml): Promise<string> {
  return parsed.LOGIN.ACER.$?.VALUE || '';
}

async function parseXml<T>(operation: (parsed: ParsedXml) => Promise<T>, xml: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const parser = new xml2js.Parser({ explicitArray: false });
    parser.parseString(xml, async (err, result) => {
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

export function getValueFromMap(
  responseMap: Map<string, string>,
  registryKey: string,
  registryError: string[],
): string | undefined {
  const registryName = registryMapper.get(registryKey);
  if (registryName === undefined) {
    registryError.push(
      `Application mapping is invalid. ` + `Property '${registryKey}' is not assigned to any Regulus Registry name.`,
    );
    console.log(`Application mapping is invalid. 
      Property '${registryKey}' is not assigned to any Regulus Registry name`);
    return undefined;
  }
  const registryValue = responseMap.get(registryName);
  if (registryValue === undefined) {
    registryError.push(
      `'${registryKey}' could not be found. '${registryName}' is missing in xml response or ` +
      `'${registryKey}' is mapped to another registry. Pls. contact Regulus provider.`,
    );
    console.log(
      `Property '${registryKey}' is assigned to registry '${registryName}', but is not found in response xml`,
    );
    return undefined;
  }
  return registryValue;
}