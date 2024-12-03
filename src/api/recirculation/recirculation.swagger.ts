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
      },
    },
  },
};
