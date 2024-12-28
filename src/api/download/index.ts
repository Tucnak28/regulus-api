import express, { Router } from 'express';
import { AxiosError } from 'axios';
import { host } from '../../config/config.js';
import { BadRequestError } from '../../exception/badRequestError.js';
import { DownloadApi } from './downloadApi.js';

const router: Router = express.Router();
const downloadApi = new DownloadApi();

router.get('/', async (req, res, next) => {
  const { fileName } = req.query;
  const apiUrl = `${host}/${fileName}`;
  try {
    const validKeys = Object.keys(req.query);
    if (validKeys.filter((key) => key === 'fileName').length === 0) {
      throw new BadRequestError('File name is required');
    }

    if (validKeys.length > 1) {
      throw new BadRequestError(`Only 'fileName' parameter is allowed`);
    }

    const response = await downloadApi.fetchFile(apiUrl);
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);

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
