import swaggerUiExpress from 'swagger-ui-express';
import { Router } from 'express';
import { zone1Path } from '../api/zone1/zone1.swagger';
import { createDocument } from 'zod-openapi';
import { dashboardPath } from '../api/dashboard/dashboard.swagger';
import { heatPumpPath } from '../api/heatPump/heatPump.swagger';
import { solarPath } from '../api/solar/solar.swagger';
import { homePath } from '../api/home/home.swagger';
import { zone2Path } from '../api/zone2/zone2.swagger';
import { waterPath } from '../api/water/water.swagger';
import { recirculationPath } from '../api/recirculation/recirculation.swagger';
import { downloadPath } from '../api/download/download.swagger';

const swaggerRouter = Router();

const wholeApiDocument = createDocument({
  openapi: '3.0.0',
  info: {
    title: 'Regulus API',
    version: '1.0.0',
    description: 'Unofficial Regulus Express Rest API',
    contact: {
      url: 'https://github.com/haluska77/Regulus-API',
    },
  },
  paths: {
    ...dashboardPath,
    ...homePath,
    ...zone1Path,
    ...zone2Path,
    ...heatPumpPath,
    ...solarPath,
    ...waterPath,
    ...recirculationPath,
    ...downloadPath,
  },
});

swaggerRouter.use('/api-docs', swaggerUiExpress.serve, swaggerUiExpress.setup(wholeApiDocument));

export default swaggerRouter;
