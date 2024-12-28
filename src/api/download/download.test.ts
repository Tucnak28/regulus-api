import express from 'express';
import request from 'supertest';
import path from 'path';
import fs from 'fs';
import router from './index';
import { DownloadApi } from './downloadApi';
import { AxiosError } from 'axios';

describe('Download', () => {
  let app: express.Application;

  beforeEach(() => {
    // jest.clearAllMocks(); // Reset mocks for each test

    app = express();
    app.use('/download', router);
  });

  it('should return 400 if fileName is not provided', async () => {
    const res = await request(app).get('/download');
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('message', 'File name is required');
  });

  it('should return 400 if more than one parameter is provided', async () => {
    const res = await request(app).get('/download?fileName=test.csv&extraParam=value');
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('message', "Only 'fileName' parameter is allowed");
  });

  it('should return 404 if given file is not found', async () => {
    const axiosError = new AxiosError(
      'Request failed with status code 404',
      'ERR_BAD_REQUEST',
      {
        method: 'get',
        url: '/error.txt',
        headers: {},
      },
      null,
      {
        data: '<h3>Requested page [ /error.txt ] not found.</h3>',
        status: 404,
        statusText: 'Not Found',
        headers: {
          'Content-Type': 'text/html',
        },
        config: {},
        request: {},
      }
    );

    jest.spyOn(DownloadApi.prototype, 'fetchFile').mockRejectedValueOnce(axiosError);

    const mockFileName = 'error.txt';

    const response = await request(app).get('/download').query({ fileName: mockFileName });
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message', 'File not found');
  });

  it('should handle the XML response correctly', async () => {
    const mockBinaryData = fs.readFileSync(path.resolve(__dirname, './mock/error.txt'));
    jest.spyOn(DownloadApi.prototype, 'fetchFile').mockResolvedValueOnce({
      data: mockBinaryData,
      status: 200,
      statusText: 'OK',
      headers: {
        'Content-Type': 'binary/bin',
      },
      config: {},
      request: {},
    });
    const mockFileName = 'error.txt';

    const response = await request(app).get('/download').query({ fileName: mockFileName });

    expect(response.status).toBe(200);
    expect(response.header['content-type']).toBe('text/csv');
    expect(response.header['content-disposition']).toBe(`attachment; filename="${mockFileName}"`);
    expect(response.body).toEqual({});
  });
});