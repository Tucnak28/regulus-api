import express, { Router } from 'express';
import { DashboardApi } from './dashboardApi.js';

const router: Router = express.Router();

const dashboardApi = new DashboardApi();

router.get('/', async (req, res, next) => {
  await dashboardApi.routeFetch(res, next);
});

export default router;
