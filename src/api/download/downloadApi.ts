import { AxiosResponse } from 'axios';
import axiosInstance, { softPLCCookie } from '../../config/axiosConfig.js';
import { LoginService } from '../../service/loginService.js';

export class DownloadApi {
  public async fetchFile(apiUrl: string): Promise<AxiosResponse> {
    if (!softPLCCookie) {
      const lResponse = await LoginService.getLogin(); // initialize cookie SoftPLC
      const suc = await LoginService.successLogin(lResponse);
    }

    return await axiosInstance.get(apiUrl, {
      headers: {
        'Content-Type': 'binary-bin',
      },
      responseType: 'arraybuffer',
    });
  }
}
