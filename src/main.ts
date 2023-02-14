import { NestFactory } from '@nestjs/core';
import { SwaggerModule,DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {  //fonction qui démarre notre appli
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
  .setTitle('Intra-CVS API')
  .setDescription('API CREATION CV')
  .setVersion('1.0')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);


app.useGlobalPipes(new ValidationPipe({

    whitelist: true,
    forbidNonWhitelisted: true,

  })
)};