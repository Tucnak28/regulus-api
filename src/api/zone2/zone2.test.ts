import express from 'express';
import request from 'supertest';
import router from '.';
import { zone2ResponseSchema } from './zone2Schemas';

const app = express();
app.use(express.json());
app.use('/', router);

describe('GET /', () => {
  it('should return 200', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body).not.toBeNull();

    const parseResult = zone2ResponseSchema.safeParse(res.body);

    expect(parseResult.success).toBe(true);
  });
});
