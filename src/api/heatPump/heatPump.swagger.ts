import { heatPumpResponseSchema } from './heatPumpSchemas.js';

export const heatPumpPath = {
  '/heatPump': {
    get: {
      tags: ['Sources'],
      summary: 'Retrieve data from Heat Pump',
      responses: {
        200: {
          description: 'Success response',
          content: {
            'application/json': {
              schema: heatPumpResponseSchema,
            },
          },
        },
      },
    },
  },
};
