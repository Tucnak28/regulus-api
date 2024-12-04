import { DashboardApi } from './dashboardApi';
import { dashboardResponseSchema } from './dashboardSchemas';
import axiosInstance from '../../config/axiosConfig';
import { host } from '../../config/config';
import path from 'path';
import fs from 'fs';
import happy from './mock/happyPathResponse.json';


jest.mock('../../config/axiosConfig', () => {
  const actualAxiosConfig = jest.requireActual('../../config/axiosConfig');
  return {
    ...actualAxiosConfig,
    get: jest.fn(),
  };
});

describe('DashboardApi', () => {
  it('should handle the XML response correctly', async () => {
    const mockXml = fs.readFileSync(path.resolve(__dirname, './mock/happyPath.xml'), 'utf-8');

    (axiosInstance.get as jest.Mock).mockResolvedValueOnce({
      data: mockXml,
      status: 200,
    });

    const dashboardApi = new DashboardApi();
    const result = await dashboardApi.fetch();

    expect(axiosInstance.get).toHaveBeenCalledWith(`${host}/1_sch.xml`);

    expect(result).toEqual(happy);
    expect(() => dashboardResponseSchema.parse(result)).not.toThrow();
  });
});
