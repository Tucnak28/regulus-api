import express from 'express';
import request from 'supertest';
import router from './index';
import axiosInstance from '../../config/axiosConfig';
import { host } from '../../config/config';
import path from 'path';
import fs from 'fs';
import happy from './mock/recirculationHappyPathResponse.json';
import { RecirculationApi } from './recirculationApi';
import { recirculationResponseSchema } from './recirculationSchemas';

jest.mock('../../config/axiosConfig', () => {
  const actualAxiosConfig = jest.requireActual('../../config/axiosConfig');
  return {
    ...actualAxiosConfig,
    get: jest.fn(),
  };
});

describe('RecirculationApi', () => {
  it('should handle the XML response correctly', async () => {
    const mockXml = fs.readFileSync(path.resolve(__dirname, './mock/recirculationHappyPath.xml'), 'utf-8');

    (axiosInstance.get as jest.Mock).mockResolvedValueOnce({
      data: mockXml,
      status: 200,
    });

    const recirculationApi = new RecirculationApi();
    const result = await recirculationApi.fetch();

    expect(axiosInstance.get).toHaveBeenCalledWith(`${host}/tv_c.xml`);

    expect(result).toEqual(happy);
    expect(() => recirculationResponseSchema.parse(result)).not.toThrow();
  });

  let app: express.Application;

  app = express();
  app.use('/recirculation', router);

  it('should return 409 if registry mapping failed', async () => {
    const mockXml = fs.readFileSync(path.resolve(__dirname, './mock/recirculationMissingField.xml'), 'utf-8');

    (axiosInstance.get as jest.Mock).mockResolvedValueOnce({
      data: mockXml,
      status: 200,
    });

    const res = await request(app).get('/recirculation');
    expect(res.status).toBe(409);

    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toEqual(
      `'recirculationServiceEnabled' could not be found. '__R18395.0_BOOL_i' is missing in xml response or 'recirculationServiceEnabled' is mapped to another registry. Pls. contact Regulus provider.`,
    );
  });
});
