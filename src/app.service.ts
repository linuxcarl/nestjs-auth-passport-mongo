import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config_enviroments from './config_enviroments';

@Injectable()
export class AppService {
  constructor(
    @Inject('API_KEY') private apiKey: string,
    @Inject(config_enviroments.KEY)
    private readonly configService: ConfigType<typeof config_enviroments>,
  ) {}
  getHello(): string {
    return `api key=> ${this.apiKey}
    \n- DB_NAME: ${this.configService.database.DB_NAME}
    \n- DB_HOST: ${this.configService.database.DB_HOST}`;
  }
}
