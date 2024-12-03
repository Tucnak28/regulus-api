import { waterResponseSchema } from './waterSchemas.js';

export const waterPath = {
  '/water': {
    get: {
      tags: ['Zones'],
      summary: 'Retrieve data from Water from Heat Pump',
      responses: {
        200: {
          description: 'Water from Heat Pump retrieved',
          content: {
            'application/json': {
              schema: waterResponseSchema,
            },
          },
        },
      },
    },
  },
};
