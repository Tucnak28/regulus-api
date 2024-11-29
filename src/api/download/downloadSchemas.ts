import { z } from 'zod';
import { extendZodWithOpenApi } from 'zod-openapi';

extendZodWithOpenApi(z);

export const fileRequiredResponse = z.object({
  message: z.string().default('File name is required'),
});

export const fileNotFoundResponse = z.object({
  message: z.string().default('File not found'),
});
