import dotEnvExtended from 'dotenv-extended';

dotEnvExtended.load();
export const port = process.env.PORT ?? 3301;
export const regulusIp = process.env.HOST_IP_ADDRESS;
