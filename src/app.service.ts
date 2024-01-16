import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config_enviroments from './config_enviroments';
import { Db } from 'mongodb'; // 👈 Import DB Type

@Injectable()
export class AppService {
  constructor(
    @Inject('MONGO') private database: Db,
    @Inject(config_enviroments.KEY)
    private readonly configService: ConfigType<typeof config_enviroments>,
  ) {}
  getHello() {
    return 'hello';
    // return `
    // \n- DB_NAME: ${this.configService.database.DB_NAME}
    // \n- DB_HOST: ${this.configService.database.DB_HOST}`;
  }
  getTasks() {
    return this.database.collection('tasks').find().toArray();
  }
}
