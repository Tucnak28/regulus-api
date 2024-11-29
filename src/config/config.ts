import dotEnvExtended from 'dotenv-extended';

dotEnvExtended.load();
export const port = process.env.PORT ?? 3301;
export const host = process.env.HOST_IP_ADDRESS;
