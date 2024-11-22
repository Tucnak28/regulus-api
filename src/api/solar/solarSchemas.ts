import { z } from 'zod';
import { extendZodWithOpenApi } from 'zod-openapi';

extendZodWithOpenApi(z);

export const solarRequestBodySchema = z
  .object({
    solarC1ServiceEnabled: z.boolean().optional(),
    solarC2ServiceEnabled: z.boolean().optional(),
    solarC3ServiceEnabled: z.boolean().optional(),
  })
  .strict();

const consumerSchema = z.object({
  serviceEnabled: z.boolean().optional(),
  state: z.boolean().optional(),
  heating: z.boolean().optional(),
  coolingTemperature: z.string().optional(),
  maximumTemperature: z.string().optional(),
  requiredTemperature: z.string().optional(),
});

export const solarResponseSchema = z
  .object({
    panelTemperature: z.string().optional(),
    runningStatus: z.boolean().optional(),
    power: z.string().optional(),
    consumer1: consumerSchema,
    consumer2: consumerSchema,
    consumer3: consumerSchema,
    pumpStatus: z.string().optional(),
  })
  .strict()
  .openapi({
    description: 'Response object of solar source',
  });

export type SolarResponseData = z.infer<typeof solarResponseSchema>;
