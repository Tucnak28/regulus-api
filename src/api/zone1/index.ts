import express, { Router } from 'express';
import { Zone1Api } from './zone1Api.js';
import { zone1RequestBodySchema } from './zone1Schemas.js';

const router: Router = express.Router();

const zone1 = new Zone1Api();

router.get('/', async (req, res, next) => {
  await zone1.routeFetch(res, next);
});

router.patch('/', async (req, res, next) => {
  await zone1.routeUpdate(zone1RequestBodySchema, req, res, next);
});

export default router;
