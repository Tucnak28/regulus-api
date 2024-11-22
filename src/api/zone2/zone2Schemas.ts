import { z } from 'zod';
import { extendZodWithOpenApi } from 'zod-openapi';

extendZodWithOpenApi(z);

export const zone2RequestBodySchema = z
  .object({
    winterSummerPeriodState: z.boolean().optional(),
  })
  .strict();

export const zone2ResponseSchema = z
  .object({
    name: z.string().optional(),
    serviceEnabled: z.boolean().optional(),
    status: z.string().optional(),
    statusReason: z.string().optional(),
    temperature: z.string().optional(),
    requiredTemperature: z.string().optional(),
    heatingWaterTemperature: z.string().optional(),
    requiredHeatingWaterTemperature: z.string().optional(),
    winterSummerModeByDateState: z.boolean().optional(),
    winterSummerModeByTemperatureState: z.boolean().optional(),
    humidityState: z.string().optional(),
    humidity: z.string().optional(),
  })
  .strict()
  .openapi({
    description: 'Response object of zone 2',
  });

export type Zone2ResponseData = z.infer<typeof zone2ResponseSchema>;
