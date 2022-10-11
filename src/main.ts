import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //ignora los campos que no estan en el dto
      forbidNonWhitelisted: true, //lanza un error si se envia un campo que no esta en el dto
      transformOptions: {
        enableImplicitConversion: true, //convierte los tipos de datos
      },
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Platzi Store')
    .setDescription('The store API description')
    .setVersion('1.0')
    .addTag('platzi-store')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  app.enableCors();
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
