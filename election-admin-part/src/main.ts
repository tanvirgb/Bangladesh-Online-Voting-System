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
      name: sessionConstants.name,
      secret: sessionConstants.secret,
      resave: sessionConstants.resave,
      saveUninitialized: sessionConstants.saveUninitialized,
      cookie: {
        maxAge: sessionConstants.maxAge,
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();
