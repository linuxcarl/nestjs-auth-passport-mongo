import { Module, Global } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import { ConfigType } from '@nestjs/config';
import config_enviroments from 'src/config_enviroments';
import { MongooseModule } from '@nestjs/mongoose';
@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof config_enviroments>) => {
        const { MONGO_URI, MONGO_BBDD } = configService.db_mongo;
        return {
          uri: MONGO_URI,
          dbName: MONGO_BBDD,
        };
      },
      inject: [config_enviroments.KEY],
    }),
  ],
  providers: [
    {
      provide: 'MONGO',
      useFactory: async (
        configService: ConfigType<typeof config_enviroments>,
      ) => {
        const { MONGO_URI, MONGO_BBDD } = configService.db_mongo;
        const uri = MONGO_URI;
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
