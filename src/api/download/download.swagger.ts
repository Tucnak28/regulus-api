import { ParameterObject } from 'zod-openapi/dist/openapi3-ts/dist/oas31';
import { fileNotFoundResponse, fileRequiredResponse } from './downloadSchemas';
import { ZodOpenApiPathsObject } from 'zod-openapi';
import { z } from 'zod';

export const downloadPath: ZodOpenApiPathsObject = {
  '/download': {
    get: {
      tags: ['Others'],
      summary: 'Download file',
      description: 'This endpoint allows you to download a file by providing the file name.',
      parameters: [
        {
          name: 'fileName',
          in: 'query',
          required: true,
          description: 'The name of the file to download',
          schema: {
            type: 'string',
            minLength: 1,
          },
        } as ParameterObject,
      ],
      responses: {
        '200': {
          description: 'File successfully downloaded',
          content: {
            'application/octet-stream': {
              schema: z.unknown(),
            },
          },
        },
        '400': {
          description: 'File name is required',
          content: {
            'application/json': {
              schema: fileRequiredResponse,
            },
          },
        },
        '404': {
          description: 'File not found',
          content: {
            'application/json': {
              schema: fileNotFoundResponse,
            },
          },
        },
      },
    },
  },
};
