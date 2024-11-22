import { z } from 'zod';
import { extendZodWithOpenApi } from 'zod-openapi';

extendZodWithOpenApi(z);

export const homeResponseSchema = z
  .object({
    outdoorTemperature: z.string().optional(),
  })
  .strict()
  .openapi({
    description: 'Response object of heat pump source',
  });

export type HomeResponseData = z.infer<typeof homeResponseSchema>;
