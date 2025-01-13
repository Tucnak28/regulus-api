import { AbstractApi } from './abstractApi.js';
import axiosInstance from '../config/axiosConfig.js';
import { host } from '../config/config.js';
import { registryMapper } from '../mapper/registryMapper.js';
import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export abstract class UpdateAbstractApi<U extends Record<string, unknown>, T> extends AbstractApi<T> {
  async routeUpdate(requestSchema: ZodSchema, req: Request, res: Response, next: NextFunction) {
    try {
      req.headers['content-type'] = 'application/json';
      const body = requestSchema.parse(req.body);
      const data = await this.update(body);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  update(body: U): Promise<T> {
    return this.execute(() => {
      const apiUrl = `${host}${this.page}`;
      const bodyObj = this.objectToUrlSearchParams(body);
      return axiosInstance.post(apiUrl, bodyObj, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
    });
  }

  private objectToUrlSearchParams(reqBody: U): URLSearchParams {
    const bodyObj = new URLSearchParams();
    for (const [key, value] of Object.entries(reqBody)) {
      const registryName = registryMapper.get(key)!;
      if (value !== undefined) {
        const stringValue = typeof value === 'boolean' ? (value ? '1' : '0') : String(value);
        bodyObj.append(registryName, stringValue);
      }
    }
    return bodyObj;
  }
}
