import express, { Express, Request, Response, NextFunction } from 'express';
import swaggerRouter from './swagger/index.js';
import homeRouter from './api/home/index.js';
import heatPumpRouter from './api/heatPump/index.js';
import dashboardRouter from './api/dashboard/index.js';
import zone1Router from './api/zone1/index.js';
import zone2Router from './api/zone2/index.js';
import solarRouter from './api/solar/index.js';
import waterRouter from './api/water/index.js';
import recirculationRouter from './api/recirculation/index.js';
import downloadRouter from './api/download/index.js';
import path from 'path';
import { port } from './config/config.js';
import { UnAuthorizedError } from './exception/unAuthorizedError.js';
import { IllegalStatusError } from './exception/illegalStatusError.js';
import { UnknownApiTypeError } from './exception/unknownApiTypeError.js';
import { ZodError } from 'zod';
import { AxiosError } from 'axios';

const app: Express = express();

app.use(express.json());
app.use(express.static(path.join(process.cwd(), './dist/')));

app.use('/home', homeRouter);
app.use('/heatPump', heatPumpRouter);
app.use('/dashboard', dashboardRouter);
app.use('/zone1', zone1Router);
app.use('/zone2', zone2Router);
app.use('/solar', solarRouter);
app.use('/water', waterRouter);
app.use('/recirculation', recirculationRouter);
app.use('/download', downloadRouter);
app.use(swaggerRouter);

app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'index.html'));
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof SyntaxError && 'body' in err) {
    res.status(400).json({ error: 'Invalid JSON format. Please check your request body.' });
  } else if (err instanceof AxiosError) {
    res.status(400).send(err.message);
  } else if (err instanceof ZodError) {
    res.status(400).send(err.message);
  } else if (err instanceof UnAuthorizedError) {
    res.status(err.statusCode).send();
  } else if (err instanceof UnknownApiTypeError) {
    res.status(err.statusCode).json(err.message);
  } else if (err instanceof IllegalStatusError) {
    res.status(err.statusCode).json(err.message);
  } else {
    next(err);
  }
});

app.use((err: Error, req: Request, res: Response) => {
  console.error(err);
  res.status(500).json({ message: 'Unexpected error!' });
});

app.listen(port, () => {
  console.log(`⚡️[Server]: Server is running on port: ${port}`);
});

export default app;
