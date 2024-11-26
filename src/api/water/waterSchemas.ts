import { z } from 'zod';
import { extendZodWithOpenApi } from 'zod-openapi';

extendZodWithOpenApi(z);

export const waterResponseSchema = z
  .object({
    name: z.string().optional(),
    serviceEnabled: z.boolean().optional(),
    state: z.boolean().optional(),
    status: z.string().optional(),
    switchingSensorTemperature: z.string().optional(),
    comfortTemperature: z.string().optional(),
    setbackTemperature: z.string().optional(),
    requiredTemperature: z.string().optional(),
    thermalStoreStatus: z.boolean().optional(),
    thermalStoreTemperature: z.string().optional(),
    useTimeProgramState: z.boolean().optional(),
    useSecondPeriodState: z.boolean().optional(),
  })
  .strict()
  .openapi({
    description: 'Response object of water',
  });

export type WaterResponseData = z.infer<typeof waterResponseSchema>;
