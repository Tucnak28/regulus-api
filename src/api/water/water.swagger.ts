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
