import express from 'express';
import request from 'supertest';
import router from './index';
import axiosInstance from '../../config/axiosConfig';
import { host } from '../../config/config';
import path from 'path';
import fs from 'fs';
import happy from './mock/zone1HappyPathResponse.json';
import { Zone1Api } from './zone1Api';
import { zone1ResponseSchema } from './zone1Schemas';

jest.mock('../../config/axiosConfig', () => {
  const actualAxiosConfig = jest.requireActual('../../config/axiosConfig');
  return {
    ...actualAxiosConfig,
    get: jest.fn(),
  };
});

describe('WaterApi', () => {
  it('should handle the XML response correctly', async () => {
    const mockXml = fs.readFileSync(path.resolve(__dirname, './mock/zone1HappyPath.xml'), 'utf-8');

    (axiosInstance.get as jest.Mock).mockResolvedValueOnce({
      data: mockXml,
      status: 200,
    });

    const zone1PumpApi = new Zone1Api();
    const result = await zone1PumpApi.fetch();

    expect(axiosInstance.get).toHaveBeenCalledWith(`${host}/zo_z1.xml`);

    expect(result).toEqual(happy);
    expect(() => zone1ResponseSchema.parse(result)).not.toThrow();
  });

  let app: express.Application;

  app = express();
  app.use('/zone1', router);
  
  it('should return 409 if registry mapping failed', async () => {
    const mockXml = fs.readFileSync(path.resolve(__dirname, './mock/zone1MissingField.xml'), 'utf-8');

    (axiosInstance.get as jest.Mock).mockResolvedValueOnce({
      data: mockXml,
      status: 200,
    });

    const res = await request(app).get('/zone1');
    expect(res.status).toBe(409);
    
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toEqual(
      `'zone1Status' could not be found. '__R15458_STRING[20]_s' is missing in xml response or 'zone1Status' is mapped to another registry. Pls. contact Regulus provider.|` + 
      `'zone1WinterSummerModeByTemperatureState' could not be found. '__R15186.0_BOOL_i' is missing in xml response or 'zone1WinterSummerModeByTemperatureState' is mapped to another registry. Pls. contact Regulus provider.`);
  });
});
