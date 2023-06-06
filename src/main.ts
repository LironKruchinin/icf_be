import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';

async function bootstrap() {
  config();

  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // app.use((req, res, next) => {
  //   console.log('Headers', req.headers);

  // })
  await app.listen(3000);
}
bootstrap();
