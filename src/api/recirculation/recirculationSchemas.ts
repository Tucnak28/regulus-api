import { z } from 'zod';
import { extendZodWithOpenApi } from 'zod-openapi';

extendZodWithOpenApi(z);

export const recirculationResponseSchema = z
  .object({
    serviceEnabled: z.boolean().optional(),
    state: z.boolean().optional(),
    period: z.string().optional(),
    delay: z.string().optional(),
    immediatePeriod: z.string().optional(),
    immediateState: z.boolean().optional(),
    useTimeProgramState: z.boolean().optional(),
    useSecondPeriodState: z.boolean().optional(),
  })
  .strict()
  .openapi({
    description: 'Response object of recirculation',
  });

export type RecirculationResponseData = z.infer<typeof recirculationResponseSchema>;
