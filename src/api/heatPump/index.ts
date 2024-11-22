import express, { Router } from 'express';
import { HeatPumpApi } from './heatPumpApi';
import { ApiService } from '../../service/apiService';

const router: Router = express.Router();

const apiService = new ApiService();
const heatPumpApi = new HeatPumpApi(apiService);

router.get('/', async (req, res, next) => {
  try {
    const data = await heatPumpApi.fetch();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

export default router;
