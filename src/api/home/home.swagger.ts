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
        409: {
          description: 'This returns invalid response from host or invalid application mapping',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    minLength: 1,
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
