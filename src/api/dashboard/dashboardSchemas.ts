import { z } from 'zod';
import { extendZodWithOpenApi } from 'zod-openapi';

extendZodWithOpenApi(z);

const zoneSchema = z.object({
  status: z.boolean().optional(),
  actualTemperature: z.string().optional(),
  requiredTemperature: z.string().optional(),
  actualHeatingWaterTemperature: z.string().optional(),
  requiredHeatingWaterTemperature: z.string().optional(),
});

const heatPumpSchema = z.object({
  runningStatus: z.boolean().optional(),
  outletTemperature: z.string().optional(),
  inletTemperature: z.string().optional(),
});

const akuSchema = z.object({
  status: z.boolean().optional(),
  topTemperature: z.string().optional(),
  bottomTemperature: z.string().optional(),
  requiredTemperature: z.string().optional(),
});

const waterSchema = z.object({
  status: z.boolean().optional(),
  actualTemperature: z.string().optional(),
  requiredTemperature: z.string().optional(),
});

const solarSchema = z.object({
  status: z.boolean().optional(),
  panelTemperature: z.string().optional(),
});

const circulationSchema = z.object({
  status: z.boolean().optional(),
});

export const dashboardResponseSchema = z.object({
  //outdoorTemperature: z.string().optional(),
  //rcTariff: z.string().optional(),
  //holiday: z.string().optional(),
  //heatPump: heatPumpSchema,
  //zone1: zoneSchema,
  //zone2: zoneSchema,
  aku: akuSchema,
  water: waterSchema,
  //solar: solarSchema,
  //circulation: circulationSchema.strict().openapi({
  //   description: 'Monitor response object',
  // }),
});

export type DashboardResponseData = z.infer<typeof dashboardResponseSchema>;
