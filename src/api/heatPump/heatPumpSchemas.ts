import { z } from 'zod';
import { extendZodWithOpenApi } from 'zod-openapi';

extendZodWithOpenApi(z);

const statisticsSchema = z.object({
  totalHours: z.string().optional(),
  totalStarts: z.string().optional(),
  todayHours: z.string().optional(),
  todayMinutes: z.string().optional(),
  todayStarts: z.string().optional(),
  yesterdayHours: z.string().optional(),
  yesterdayMinutes: z.string().optional(),
  yesterdayStarts: z.string().optional(),
});

export const heatPumpResponseSchema = z
  .object({
    serviceEnabled: z.boolean().optional(),
    status: z.string().optional(),
    compressor: z.string().optional(),
    outletTemperature: z.string().optional(),
    inletTemperature: z.string().optional(),
    runningStatus: z.boolean().optional(),
    runningTime: z.string().optional(),
    rps: z.string().optional(),
    idleTime: z.string().optional(),
    //overallStatistics: statisticsSchema,
    //hotWaterStatistics: statisticsSchema,
  })
  .strict()
  .openapi({
    description: 'Response object of heat pump source',
  });

export type HeatPumpResponseData = z.infer<typeof heatPumpResponseSchema>;
