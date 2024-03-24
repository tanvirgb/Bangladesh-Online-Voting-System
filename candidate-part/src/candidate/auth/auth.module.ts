import { Module } from '@nestjs/common';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { CandidateModule } from '../candidate.module';


@Module({
  imports: [
    PassportModule,
    CandidateModule,
    JwtModule.register({
      global: true,
      secret: 'key',
      signOptions: {
        expiresIn: '1h',
      },
    }),
  ],
  controllers: [],
  providers: [LocalStrategy, JwtStrategy, AuthService],
  exports: [AuthService],
})
export class AuthModule {}
