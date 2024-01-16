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
      MONGO_URI: process.env.MONGO_URI,
    },
    API_KEY: process.env.API_KEY,
    JWT_SECRET: process.env.JWT_SECRET,
  };
});
