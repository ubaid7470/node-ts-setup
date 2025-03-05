import dotenv from 'dotenv';
dotenv.config();

const environments = {
  development: {
    node_env: process.env.NODE_ENV ?? 'development',
    port: process.env.PORT ?? 5000,
    mongoDB: process.env.MONGODB_URI,
  },
  production: {
    node_env: process.env.NODE_ENV ?? 'development',
    port: process.env.PORT ?? 5000,
    mongoDB: process.env.MONGODB_URI,
  },
};

export const config =
  process.env.NODE_ENV == 'production'
    ? environments.production
    : environments.development;
