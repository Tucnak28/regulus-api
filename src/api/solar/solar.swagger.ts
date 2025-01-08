import { solarRequestBodySchema, solarResponseSchema } from './solarSchemas.js';

export const solarPath = {
  '/solar': {
    get: {
      tags: ['Sources'],
      summary: 'Retrieve data from Solar',
      responses: {
        200: {
          description: 'Solar monitor',
          content: {
            'application/json': {
              schema: solarResponseSchema,
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
    patch: {
      tags: ['Sources'],
      summary: 'Update Solar',
      requestBody: {
        content: {
          'application/json': {
            schema: solarRequestBodySchema,
          },
        },
      },
      responses: {
        200: {
          description: 'Solar updated',
          content: {
            'application/json': {
              schema: solarResponseSchema,
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
