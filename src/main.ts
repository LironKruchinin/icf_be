import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as cookieParser from 'cookie-parser';
import * as fs from 'fs';
import * as https from 'https';
import * as path from 'path';

async function bootstrap() {
  dotenv.config();

  const keyPath = path.join(__dirname, '..', 'keys', 'localhost-key.pem');
  const certPath = path.join(__dirname, '..', 'keys', 'localhost.pem');

  const httpsOptions = {
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath),
  };

  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3001',
    credentials: true,
  });

  app.use(cookieParser());
  await app.listen(3000);
}

bootstrap();
