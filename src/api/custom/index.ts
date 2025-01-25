import express, { Router } from 'express';
import { CustomApi } from './customApi.js'; // Import the CustomApi class
import { HomeApi } from '../home/homeApi.js'; // Import the CustomApi class
import { Zone1Api } from '../zone1/zone1Api.js';
import { HeatPumpApi } from '../heatPump/heatPumpApi.js';
import { DashboardApi } from '../dashboard/dashboardApi.js';

const router: Router = express.Router();

const customApi = new CustomApi(); // Create an instance of CustomApi
const homeapi = new HomeApi(); // Create an instance of CustomApi
const zone1 = new Zone1Api(); // Create an instance of CustomApi
const heatpumpapi = new HeatPumpApi(); // Create an instance of CustomApi
const dashboardapi = new DashboardApi(); // Create an instance of CustomApi

// Define the custom route
router.get('/', async (req, res, next) => {
  try {
    // Fetch data from Zone1Api and HomeApi
    const zone1Data = await zone1.routeFetch(res, next);
    const homeData = await homeapi.routeFetch(res, next);
    const heatPumpData = await heatpumpapi.routeFetch(res, next);
    const dashboardData = await dashboardapi.routeFetch(res, next);

    // Combine the data from both APIs
    const combinedData = {
      zone1: zone1Data,
      home: homeData,
      heatPump: heatPumpData,
      dashboard: dashboardData,
    };

    // Return the combined data as the response
    res.json(combinedData);
  } catch (error) {
    next(error); // Pass the error to the next middleware for proper error handling
  }
});

export default router;
