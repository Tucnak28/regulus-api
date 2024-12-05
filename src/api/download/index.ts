import express, { Router } from 'express';
import { AxiosError } from 'axios';
import { host } from '../../config/config.js';
import axiosInstance, { softPLCCookie } from '../../config/axiosConfig.js';
import { BadRequestError } from '../../exception/badRequestError.js';
import { LoginService } from '../../service/loginService.js';

const router: Router = express.Router();

router.get('/', async (req, res, next) => {
  const { fileName } = req.query;
  const apiUrl = `${host}/${fileName}`;
  try {
    const validKeys = Object.keys(req.query).filter(key => key === 'fileName');
    if (validKeys.length !== 1) {
      throw new BadRequestError(`Only 'fileName' parameter is allowed`);
    }

    if (!fileName) {
      throw new BadRequestError('File name is required');
    }

    if (!softPLCCookie) {
      const lResponse = await LoginService.postLogin();
      if (lResponse.status === 302 && lResponse.headers.location === '/LOGIN.XML') {
        LoginService.successLogin(lResponse);
      }
    }

    const response = await axiosInstance.get(apiUrl, {
      headers: {
        'Content-Type': 'binary-bin',
      },
      responseType: 'arraybuffer',
    });
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="statLog.csv"');

    res.send(response.data);
  } catch (error) {
    if (error instanceof BadRequestError) {
      res.status(error.statusCode).json(error);
    } else if (error instanceof AxiosError) {
      if (error.response?.status === 404) {
        error.message = 'File not found';
      }
      res.status(error.response?.status || 400).json({ message: error.message });
    } else {
      next(error);
    }
  }
});

export default router;
