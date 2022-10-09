import { Module, Global } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import { ConfigType } from '@nestjs/config';
import config_enviroments from 'src/config_enviroments';
@Global()
@Module({
  providers: [
    {
      provide: 'MONGO',
      useFactory: async (
        configService: ConfigType<typeof config_enviroments>,
      ) => {
        const {
          MONGO_BBDD,
          MONGO_CONF,
          MONGO_HOST,
          MONGO_PORT,
          // MONGO_PASS,
          // MONGO_USER,
        } = configService.db_mongo;
        // const uriProd = `${MONGO_CONF}://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}:${MONGO_PORT}/`;
        const uri = `${MONGO_CONF}://${MONGO_HOST}:${MONGO_PORT}/`;
        const client = new MongoClient(uri);
        await client.connect();
        const database = client.db(MONGO_BBDD);
        return database;
      },
      inject: [config_enviroments.KEY],
    },
  ],
  exports: ['MONGO'],
})
export class DatabaseModule {}
