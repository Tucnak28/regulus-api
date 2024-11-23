import { zone2RequestBodySchema, zone2ResponseSchema } from './zone2Schemas';

export const zone2Path = {
  '/zone2': {
    get: {
      tags: ['Zones'],
      summary: 'Retrieve data from Zone 2',
      responses: {
        200: {
          description: 'Zone 2 retrieved',
          content: {
            'application/json': {
              schema: zone2ResponseSchema,
            },
          },
        },
      },
    },
    patch: {
      tags: ['Zones'],
      summary: 'Update Zone 2',
      requestBody: {
        content: {
          'application/json': {
            schema: zone2RequestBodySchema,
          },
        },
      },
      responses: {
        200: {
          description: 'Zone 2 updated',
          content: {
            'application/json': {
              schema: zone2ResponseSchema,
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
