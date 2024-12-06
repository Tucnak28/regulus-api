import { dashboardResponseSchema } from './dashboardSchemas.js';

export const dashboardPath = {
  '/dashboard': {
    get: {
      tags: ['Regulus'],
      summary: 'Main dashboard',
      responses: {
        200: {
          description: 'Monitoring dashboard for all connected components',
          content: {
            'application/json': {
              schema: dashboardResponseSchema,
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
