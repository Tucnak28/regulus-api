import express, { Express, Request, Response, NextFunction } from 'express';
import swaggerRouter from './swagger';
import homeRouter from './api/home';
import heatPumpRouter from './api/heatPump';
import dashboardRouter from './api/dashboard';
import zone1Router from './api/zone1';
import zone2Router from './api/zone2';
import solarRouter from './api/solar';
import waterRouter from './api/water';
import recirculationRouter from './api/recirculation';
import downloadRouter from './api/download';
import path from 'path';
import { port } from './config/config';
import { UnAuthorizedError } from './exception/unAuthorizedError';
import { IllegalStatusError } from './exception/illegalStatusError';
import { UnknownApiTypeError } from './exception/unknownApiTypeError';
import { ZodError } from 'zod';
import { AxiosError } from 'axios';

const app: Express = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '/')));

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
  res.sendFile(path.join(__dirname, 'app.html'));
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
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

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ message: 'Unexpected error!' });
});

app.listen(port, () => {
  console.log(`⚡️[Server]: Server is running on port: ${port}`);
});

export default app;
