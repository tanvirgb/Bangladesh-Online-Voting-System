import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { sessionConstants } from './constants';
import * as session from 'express-session';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: sessionConstants.secret,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 500000,
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();
