import express, { Router } from 'express';
import { ApiService } from '../../service/apiService';
import { RecirculationApi } from './recirculationApi';

const router: Router = express.Router();

const apiService = new ApiService();
export const recirculation = new RecirculationApi(apiService);

router.get('/', async (req, res, next) => {
  try {
    const data = await recirculation.fetch();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

export default router;
