import express, { Router } from 'express';
import { HomeApi } from './homeApi';
import { ApiService } from '../../service/apiService';

const router: Router = express.Router();

const apiService = new ApiService();
const homeApi = new HomeApi(apiService);

router.get('/', async (req, res, next) => {
  try {
    const data = await homeApi.fetch();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

export default router;
