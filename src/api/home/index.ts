import express, { Router } from 'express';
import { HomeApi } from './homeApi.js';

const router: Router = express.Router();

const homeApi = new HomeApi();

router.get('/', async (req, res, next) => {
  try {
    const data = await homeApi.fetch();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

export default router;
