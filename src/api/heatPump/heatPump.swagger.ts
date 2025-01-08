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
