import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(
    @Inject('API_KEY') private apiKey: string,
    private readonly configService: ConfigService,
  ) {}
  getHello(): string {
    return `api key=> ${
      this.apiKey
    }\n- DB_NAME: ${this.configService.get<string>(
      'DB_NAME',
    )}\n- DB_HOST: ${this.configService.get<string>('DB_HOST')}`;
  }
}
