import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as session from 'express-session';
import { sessionConstants } from './constants';

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
