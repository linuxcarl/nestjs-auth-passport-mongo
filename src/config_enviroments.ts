import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      DB_NAME: process.env.DB_NAME,
      DB_HOST: process.env.DB_HOST,
      DB_PORT: process.env.DB_PORT,
      DB_USER: process.env.DB_USER,
      DB_PASSWORD: process.env.DB_PASSWORD,
    },
    db_mongo: {
      MONGO_BBDD: process.env.MONGO_BBDD,
      MONGO_CONF: process.env.MONGO_CONF,
      MONGO_HOST: process.env.MONGO_HOST,
      MONGO_PORT: parseInt(process.env.MONGO_PORT, 10),
      MONGO_PASS: process.env.MONGO_PASS,
      MONGO_USER: process.env.MONGO_USER,
    },
    API_KEY: process.env.API_KEY,
    JWT_SECRET: process.env.JWT_SECRET,
  };
});
