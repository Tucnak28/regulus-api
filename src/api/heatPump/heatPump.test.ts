import express from 'express';
import request from 'supertest';
import router from './index';
import { HeatPumpApi } from './heatPumpApi';
import { heatPumpResponseSchema } from './heatPumpSchemas';
import axiosInstance from '../../config/axiosConfig';
import { host } from '../../config/config';
import path from 'path';
import fs from 'fs';
import happy from './mock/heatPumpHappyPathResponse.json';

jest.mock('../../config/axiosConfig', () => {
  const actualAxiosConfig = jest.requireActual('../../config/axiosConfig');
  return {
    ...actualAxiosConfig,
    get: jest.fn(),
  };
});

describe('HeatPumpApi', () => {
  it('should handle the XML response correctly', async () => {
    const mockXml = fs.readFileSync(path.resolve(__dirname, './mock/heatPumpHappyPath.xml'), 'utf-8');

    (axiosInstance.get as jest.Mock).mockResolvedValueOnce({
      data: mockXml,
      status: 200,
    });

    const heatPumpApi = new HeatPumpApi();
    const result = await heatPumpApi.fetch();

    expect(axiosInstance.get).toHaveBeenCalledWith(`${host}/zd_t.xml`);

    expect(result).toEqual(happy);
    expect(() => heatPumpResponseSchema.parse(result)).not.toThrow();
  });

  let app: express.Application;

  app = express();
  app.use('/heatPump', router);

  it('should return 409 if registry mapping failed', async () => {
    const mockXml = fs.readFileSync(path.resolve(__dirname, './mock/heatPumpMissingField.xml'), 'utf-8');

    (axiosInstance.get as jest.Mock).mockResolvedValueOnce({
      data: mockXml,
      status: 200,
    });

    const res = await request(app).get('/heatPump');
    expect(res.status).toBe(409);

    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toEqual(
      `'overallTotalHours' could not be found. '__R26610_UDINT_u' is missing in xml response or 'overallTotalHours' is mapped to another registry. Pls. contact Regulus provider.|` +
        `'overallTotalStarts' could not be found. '__R26620_UINT_u' is missing in xml response or 'overallTotalStarts' is mapped to another registry. Pls. contact Regulus provider.`,
    );
  });
});
