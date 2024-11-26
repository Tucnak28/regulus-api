import express, { Router } from 'express';
import { ApiService } from '../../service/apiService';
import { WaterApi } from './waterApi';

const router: Router = express.Router();

const apiService = new ApiService();
export const water = new WaterApi(apiService);

router.get('/', async (req, res, next) => {
  try {
    const data = await water.fetch();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

export default router;
