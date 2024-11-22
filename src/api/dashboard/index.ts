import express, { Router } from 'express';
import { DashboardApi } from './dashboardApi';
import { ApiService } from '../../service/apiService';

const router: Router = express.Router();

const apiService = new ApiService();
const dashboardApi = new DashboardApi(apiService);

router.get('/', async (req, res, next) => {
  try {
    const data = await dashboardApi.fetch();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

export default router;
