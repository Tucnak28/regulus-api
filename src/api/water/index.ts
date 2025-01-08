import express, { Router } from 'express';
import { WaterApi } from './waterApi.js';
import { ConflictError } from '../../exception/conflictError.js';

const router: Router = express.Router();

export const water = new WaterApi();

router.get('/', async (req, res, next) => {
  try {
    const data = await water.fetch();
    res.status(200).json(data);
  } catch (error) {
    if (error instanceof ConflictError) {
      return res.status(error.statusCode).json(error);
    } else {
      next(error);
    }
  }
});

export default router;
