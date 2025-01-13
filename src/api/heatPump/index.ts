import express, { Router } from 'express';
import { HeatPumpApi } from './heatPumpApi.js';

const router: Router = express.Router();

const heatPumpApi = new HeatPumpApi();

router.get('/', async (req, res, next) => {
  await heatPumpApi.routeFetch(res, next);
});

export default router;
