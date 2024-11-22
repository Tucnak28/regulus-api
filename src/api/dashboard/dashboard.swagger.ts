import { dashboardResponseSchema } from './dashboardSchemas';

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
        400: {
          description: 'Bad Request',
        },
      },
    },
  },
};
