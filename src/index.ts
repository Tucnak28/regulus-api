import express, { Express, Request, Response, NextFunction } from 'express';
import swaggerRouter from './swagger';
import home from './api/home';
import heatPump from './api/heatPump';
import dashboard from './api/dashboard';
import zone1 from './api/zone1';
import solar from './api/solar';
import path from 'path';
import { port } from './config/config';
import { UnAuthorizedError } from './exception/unAuthorizedError';
import { IllegalStatusError } from './exception/illegalStatusError';
import { UnknownApiTypeError } from './exception/unknownApiTypeError';
import { ZodError } from 'zod';

const app: Express = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '/')));

app.use('/home', home);
app.use('/heatPump', heatPump);
app.use('/dashboard', dashboard);
app.use('/zone1', zone1);
app.use('/solar', solar);
app.use(swaggerRouter);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'app.html'));
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof SyntaxError && 'body' in err) {
    res.status(400).json({ error: 'Invalid JSON format. Please check your request body.' });
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
  res.status(500).json({ error: 'Unexpected error!' });
});

app.listen(port, () => {
  console.log(`⚡️[Server]: Server is running on port: ${port}`);
});

export default app;
