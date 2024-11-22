import express, { Router } from 'express';
import { ApiService } from '../../service/apiService';
import { Zone1Api } from './zone1Api';
import { zone1RequestBodySchema } from './zone1Schemas';

const router: Router = express.Router();

const apiService = new ApiService();
const zone1 = new Zone1Api(apiService);

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
    req.headers['content-type'] == 'application/json';
    const body = zone1RequestBodySchema.parse(req.body);
    const data = await zone1.update(body);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

export default router;
