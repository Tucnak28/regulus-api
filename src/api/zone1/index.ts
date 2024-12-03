import express, { Router } from 'express';
import { Zone1Api } from './zone1Api.js';
import { zone1RequestBodySchema } from './zone1Schemas.js';

const router: Router = express.Router();

const zone1 = new Zone1Api();

router.get('/', async (req, res, next) => {
  try {
    const data = await zone1.fetch();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

router.patch('/', async (req, res, next) => {
  try {
    req.headers['content-type'] = 'application/json';
    const body = zone1RequestBodySchema.parse(req.body);
    const data = await zone1.update(body);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

export default router;
