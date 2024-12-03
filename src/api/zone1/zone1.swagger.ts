import { zone1RequestBodySchema, zone1ResponseSchema } from './zone1Schemas.js';

export const zone1Path = {
  '/zone1': {
    get: {
      tags: ['Zones'],
      summary: 'Retrieve data from Zone 1',
      responses: {
        200: {
          description: 'Zone 1 retrieved',
          content: {
            'application/json': {
              schema: zone1ResponseSchema,
            },
          },
        },
      },
    },
    patch: {
      tags: ['Zones'],
      summary: 'Update Zone 1',
      requestBody: {
        content: {
          'application/json': {
            schema: zone1RequestBodySchema,
          },
        },
      },
      responses: {
        200: {
          description: 'Zone 1 updated',
          content: {
            'application/json': {
              schema: zone1ResponseSchema,
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
