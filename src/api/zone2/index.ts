import express, { Router } from 'express';
import { Zone2Api } from './zone2Api.js';
import { zone2RequestBodySchema } from './zone2Schemas.js';

const router: Router = express.Router();

const zone2 = new Zone2Api();

router.get('/', async (req, res, next) => {
  await zone2.routeFetch(res, next);
});

router.patch('/', async (req, res, next) => {
  await zone2.routeUpdate(zone2RequestBodySchema, req, res, next);
});

export default router;
