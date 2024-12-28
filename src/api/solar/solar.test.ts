import axiosInstance from '../../config/axiosConfig';
import { host } from '../../config/config';
import path from 'path';
import fs from 'fs';
import happy from './mock/happyPathResponse.json';
import { SolarApi } from './solarApi';
import { SolarRequestData, solarResponseSchema } from './solarSchemas';
import { LoginService } from '../../service/loginService';
import { UnAuthorizedError } from '../../exception/unAuthorizedError';
import { AxiosResponse } from 'axios';

jest.mock('../../config/axiosConfig', () => {
  const actualAxiosConfig = jest.requireActual('../../config/axiosConfig');
  return {
    ...actualAxiosConfig,
    get: jest.fn(),
    post: jest.fn(),
  };
});

const mockedPostLogin = jest.fn();
(LoginService as { postLogin: () => Promise<AxiosResponse> }).postLogin = mockedPostLogin;

describe('SolarApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle the XML response correctly', async () => {
    const mockXml = fs.readFileSync(path.resolve(__dirname, './mock/happyPath.xml'), 'utf-8');

    (axiosInstance.get as jest.Mock).mockResolvedValueOnce({
      data: mockXml,
      status: 200,
    });

    const solarApi = new SolarApi();
    const result = await solarApi.fetch();

    expect(axiosInstance.get).toHaveBeenCalledWith(`${host}/zd_sol.xml`);

    expect(result).toEqual(happy);
    expect(() => solarResponseSchema.parse(result)).not.toThrow();
  });

  it('should update successfully', async () => {
    const mockXml = fs.readFileSync(path.resolve(__dirname, './mock/happyPath.xml'), 'utf-8');

    (axiosInstance.post as jest.Mock).mockResolvedValueOnce({
      data: mockXml,
      status: 200,
    });

    const payload: SolarRequestData = {
      solarC2ServiceEnabled: true,
    };

    const solarApi = new SolarApi();
    const result = await solarApi.update(payload);

    const params = new URLSearchParams();
    params.append('__R17432.5_BOOL_i', '1');

    expect(axiosInstance.post).toHaveBeenCalledWith(`${host}/zd_sol.xml`, params, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    expect(result).toEqual(happy);
    expect(() => solarResponseSchema.parse(result)).not.toThrow();
  });

  it('Unauthorized access', async () => {
    (axiosInstance.get as jest.Mock).mockResolvedValueOnce({
      status: 302,
      headers: {
        location: '/LOGIN.XML',
      },
    });

    mockedPostLogin.mockResolvedValue({
      status: 200,
      data: `<?xml version="1.0" encoding="utf-8" ?>
            <?xml-stylesheet type="text/xsl" href="LOGIN.XSL" version="1.0"?>
            <LOGIN>
                <USER VALUE=""/>
                <PASS VALUE=""/>
                <ACER VALUE="1"/>
            </LOGIN>`,
    });

    const solarApi = new SolarApi();
    await expect(solarApi.fetch()).rejects.toThrow(UnAuthorizedError);

    expect(axiosInstance.get).toHaveBeenCalledWith(`${host}/zd_sol.xml`);
    expect(mockedPostLogin).toHaveBeenCalled();
  });
});
