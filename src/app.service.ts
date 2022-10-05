import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(@Inject('API_KEY') private apiKey: string) {}
  getHello(): string {
    return `api key=> ${this.apiKey}`;
  }
}
