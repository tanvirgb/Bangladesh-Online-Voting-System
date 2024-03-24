import { Candidate } from './candidate/entities/candidate.entity';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './candidate/auth/auth.module';
import { CandidateModule } from './candidate/candidate.module';


@Module({
  imports: [
    CandidateModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env.local' }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts/.js}'],
        synchronize: configService.get<boolean>('DB_SYNC'),
        autoLoadEntities: true,
        logging: true,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
