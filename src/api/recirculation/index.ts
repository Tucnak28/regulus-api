import express, { Router } from 'express';
import { RecirculationApi } from './recirculationApi.js';

const router: Router = express.Router();

export const recirculation = new RecirculationApi();

router.get('/', async (req, res, next) => {
  await recirculation.routeFetch(res, next);
});

export default router;
