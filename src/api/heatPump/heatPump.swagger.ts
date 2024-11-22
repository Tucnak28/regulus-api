import { heatPumpResponseSchema } from './heatPumpSchemas';

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
        400: {
          description: 'Bad Request',
        },
      },
    },
  },
};
