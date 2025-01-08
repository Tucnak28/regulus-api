import express, { Router } from 'express';
import { DashboardApi } from './dashboardApi.js';
import { ConflictError } from '../../exception/conflictError.js';

const router: Router = express.Router();

const dashboardApi = new DashboardApi();

router.get('/', async (req, res, next) => {
  try {
    const data = await dashboardApi.fetch();
    res.status(200).json(data);
  } catch (error) {
    if (error instanceof ConflictError) {
      return res.status(error.statusCode).json(error);
    } else {
      next(error);
    }
  }
});

export default router;
