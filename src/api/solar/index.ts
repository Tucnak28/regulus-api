import express, { Router } from 'express';
import { SolarApi } from './solarApi.js';
import { solarRequestBodySchema } from './solarSchemas.js';

const router: Router = express.Router();

const solarApi = new SolarApi();

router.get('/', async (req, res, next) => {
  await solarApi.routeFetch(res, next);
});

router.patch('/', async (req, res, next) => {
  await solarApi.routeUpdate(solarRequestBodySchema, req, res, next);
});

export default router;
