import { customResponseSchema } from './customSchemas.js';

export const customPath = {
  '/custom': {
    get: {
      tags: ['CustomTag'], // Modify the tag to match your use case
      summary: 'Custom home route', // Modify the summary to reflect your route's purpose
      responses: {
        200: {
          description: 'Successful response with custom data',
          content: {
            'application/json': {
              schema: customResponseSchema, // Use a custom schema instead of homeResponseSchema
            },
          },
        },
        400: {
          description: 'Bad request due to invalid input',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: {
                    type: 'string',
                    minLength: 1,
                  },
                },
              },
            },
          },
        },
        500: {
          description: 'Internal server error',
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
