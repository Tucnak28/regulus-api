import { homeResponseSchema } from './homeSchemas';

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
        400: {
          description: 'Bad Request',
        },
      },
    },
  },
};
