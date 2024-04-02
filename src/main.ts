import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NestFastifyApplication, FastifyAdapter } from '@nestjs/platform-fastify';
import { useContainer } from 'class-validator';
import fastifyCookie from '@fastify/cookie';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  await app.register(fastifyCookie, {
    secret: process.env.COOKIE_SECRET, // for cookies signature
  });
  app.enableCors({
    origin: "*"
  })
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  if(process.env.MODE != 'production'){
    const config = new DocumentBuilder()
      .setTitle('IEI')
      .setDescription('The iei API description')
      .addTag('user')
      .addTag('answer')
      .addTag('province')
      .addTag('user')
      .addTag('city')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }
  
  await app.listen(3000,'0.0.0.0');
}
bootstrap();