import express, { Router } from 'express';
import { HomeApi } from './homeApi.js';

const router: Router = express.Router();

const homeApi = new HomeApi();

router.get('/', async (req, res, next) => {
  await homeApi.routeFetch(res, next);
});

export default router;
