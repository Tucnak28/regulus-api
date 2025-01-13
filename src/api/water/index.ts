import express, { Router } from 'express';
import { WaterApi } from './waterApi.js';

const router: Router = express.Router();

export const water = new WaterApi();

router.get('/', async (req, res, next) => {
  await water.routeFetch(res, next);
});

export default router;
