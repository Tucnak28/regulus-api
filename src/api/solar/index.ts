import express, { Router } from 'express';
import { ApiService } from '../../service/apiService';
import { SolarApi } from './solarApi';
import { solarRequestBodySchema } from './solarSchemas';

const router: Router = express.Router();

const apiService = new ApiService();
const solarApi = new SolarApi(apiService);

router.get('/', async (req, res, next) => {
  try {
    const data = await solarApi.fetch();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

router.patch('/', async (req, res, next) => {
  try {
    const body = solarRequestBodySchema.parse(req.body);
    const data = await solarApi.update(body);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

export default router;
