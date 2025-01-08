import express from 'express';
import request from 'supertest';
import router from './index';
import axiosInstance from '../../config/axiosConfig';
import { host } from '../../config/config';
import path from 'path';
import fs from 'fs';
import happy from './mock/zone2HappyPathResponse.json';
import { Zone2Api } from './zone2Api';
import { zone2ResponseSchema } from './zone2Schemas';

jest.mock('../../config/axiosConfig', () => {
  const actualAxiosConfig = jest.requireActual('../../config/axiosConfig');
  return {
    ...actualAxiosConfig,
    get: jest.fn(),
  };
});

describe('WaterApi', () => {
  it('should handle the XML response correctly', async () => {
    const mockXml = fs.readFileSync(path.resolve(__dirname, './mock/zone2HappyPath.xml'), 'utf-8');

    (axiosInstance.get as jest.Mock).mockResolvedValueOnce({
      data: mockXml,
      status: 200,
    });

    const zone2PumpApi = new Zone2Api();
    const result = await zone2PumpApi.fetch();

    expect(axiosInstance.get).toHaveBeenCalledWith(`${host}/zo_z2.xml`);

    expect(result).toEqual(happy);
    expect(() => zone2ResponseSchema.parse(result)).not.toThrow();
  });

  let app: express.Application;

  app = express();
  app.use('/zone2', router);

  it('should return 409 if registry mapping failed', async () => {
    const mockXml = fs.readFileSync(path.resolve(__dirname, './mock/zone2MissingField.xml'), 'utf-8');

    (axiosInstance.get as jest.Mock).mockResolvedValueOnce({
      data: mockXml,
      status: 200,
    });

    const res = await request(app).get('/zone2');
    expect(res.status).toBe(409);

    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toEqual(
      `'zone2ServiceEnabled' could not be found. '__R18006.0_BOOL_i' is missing in xml response or 'zone2ServiceEnabled' is mapped to another registry. Pls. contact Regulus provider.|` +
        `'zone2HumidityState' could not be found. '__R112275.7_BOOL_i' is missing in xml response or 'zone2HumidityState' is mapped to another registry. Pls. contact Regulus provider.`,
    );
  });
});
