import express, { Router } from 'express';
import { RecirculationApi } from './recirculationApi.js';

const router: Router = express.Router();

export const recirculation = new RecirculationApi();

router.get('/', async (req, res, next) => {
  try {
    const data = await recirculation.fetch();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

export default router;
