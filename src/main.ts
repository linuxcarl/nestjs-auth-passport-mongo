import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //ignora los campos que no estan en el dto
      forbidNonWhitelisted: true, //lanza un error si se envia un campo que no esta en el dto
    }),
  );
  await app.listen(3000);
}
bootstrap();
