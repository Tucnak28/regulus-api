import express, { Router } from 'express';
import { ApiService } from '../../service/apiService';
import { Zone2Api } from './zone2Api';
import { zone2RequestBodySchema } from './zone2Schemas';

const router: Router = express.Router();

const apiService = new ApiService();
const zone2 = new Zone2Api(apiService);

router.get('/', async (req, res, next) => {
  try {
    const data = await zone2.fetch();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

router.patch('/', async (req, res, next) => {
  try {
    req.headers['content-type'] == 'application/json';
    const body = zone2RequestBodySchema.parse(req.body);
    const data = await zone2.update(body);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

export default router;
