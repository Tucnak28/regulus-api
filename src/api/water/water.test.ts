import express from 'express';
import request from 'supertest';
import router from './index';
import axiosInstance from '../../config/axiosConfig';
import { host } from '../../config/config';
import path from 'path';
import fs from 'fs';
import happy from './mock/waterHappyPathResponse.json';
import { WaterApi } from './waterApi';
import { waterResponseSchema } from './waterSchemas';

jest.mock('../../config/axiosConfig', () => {
  const actualAxiosConfig = jest.requireActual('../../config/axiosConfig');
  return {
    ...actualAxiosConfig,
    get: jest.fn(),
  };
});

describe('WaterApi', () => {
  it('should handle the XML response correctly', async () => {
    const mockXml = fs.readFileSync(path.resolve(__dirname, './mock/waterHappyPath.xml'), 'utf-8');

    (axiosInstance.get as jest.Mock).mockResolvedValueOnce({
      data: mockXml,
      status: 200,
    });

    const waterPumpApi = new WaterApi();
    const result = await waterPumpApi.fetch();

    expect(axiosInstance.get).toHaveBeenCalledWith(`${host}/tv_tc.xml`);

    expect(result).toEqual(happy);
    expect(() => waterResponseSchema.parse(result)).not.toThrow();
  });

  let app: express.Application;

  app = express();
  app.use('/water', router);

  it('should return 409 if registry mapping failed', async () => {
    const mockXml = fs.readFileSync(path.resolve(__dirname, './mock/waterMissingField.xml'), 'utf-8');

    (axiosInstance.get as jest.Mock).mockResolvedValueOnce({
      data: mockXml,
      status: 200,
    });

    const res = await request(app).get('/water');
    expect(res.status).toBe(409);

    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toEqual(
      `'waterState' could not be found. '__R22589.0_BOOL_i' is missing in xml response or 'waterState' is mapped to another registry. Pls. contact Regulus provider.|` +
        `'waterRequiredTemperature' could not be found. '__R8505_INT_d' is missing in xml response or 'waterRequiredTemperature' is mapped to another registry. Pls. contact Regulus provider.`,
    );
  });
});
