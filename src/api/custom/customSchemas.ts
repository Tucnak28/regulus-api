import { z } from 'zod';
import { extendZodWithOpenApi } from 'zod-openapi';

// Extend Zod with OpenAPI functionality
extendZodWithOpenApi(z);

// Define a custom response schema
export const customResponseSchema = z
  .object({
    outdoorTemperature: z.string().optional(),
  })
  .strict() // Ensures no extra properties are included
  .openapi({
    description: 'Response object for custom route',
  });

// Type definition for the custom response
export type CustomResponseData = z.infer<typeof customResponseSchema>;
