import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as process from 'process';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import * as path from 'path';
import axios from 'axios';

async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
    allowedHeaders: 'Content-Type, Accept',
  });

  const config = new DocumentBuilder()
    .setTitle('Fullstack App')
    .setDescription('REST API Documentation')
    .setVersion('1.0.0')
    .addTag('Fullstack')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);
  await app.listen(5000, () => console.log(`Server started on ${PORT} port`));
}

bootstrap();

// ServeStaticModule.forRoot({
//   rootPath: path.resolve( __dirname, 'static'),
// })
// app.useGlobalPipes(new ValidationPipe());
