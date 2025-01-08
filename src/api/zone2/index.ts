import express, { Router } from 'express';
import { Zone2Api } from './zone2Api.js';
import { zone2RequestBodySchema } from './zone2Schemas.js';
import { ConflictError } from '../../exception/conflictError.js';

const router: Router = express.Router();

const zone2 = new Zone2Api();

router.get('/', async (req, res, next) => {
  try {
    const data = await zone2.fetch();
    res.status(200).json(data);
  } catch (error) {
    if (error instanceof ConflictError) {
      return res.status(error.statusCode).json(error);
    } else {
      next(error);
    }
  }
});

router.patch('/', async (req, res, next) => {
  try {
    req.headers['content-type'] = 'application/json';
    const body = zone2RequestBodySchema.parse(req.body);
    const data = await zone2.update(body);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

export default router;
