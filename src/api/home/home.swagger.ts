import { homeResponseSchema } from './homeSchemas.js';

export const homePath = {
  '/home': {
    get: {
      tags: ['Regulus'],
      summary: 'Home site',
      responses: {
        200: {
          description: 'Success response',
          content: {
            'application/json': {
              schema: homeResponseSchema,
            },
          },
        },
      },
    },
  },
};
