import { recirculationResponseSchema } from './recirculationSchemas.js';

export const recirculationPath = {
  '/recirculation': {
    get: {
      tags: ['Zones'],
      summary: 'Retrieve data from Recirculation',
      responses: {
        200: {
          description: 'Recirculation retrieved',
          content: {
            'application/json': {
              schema: recirculationResponseSchema,
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
