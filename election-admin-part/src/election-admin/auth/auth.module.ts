import { Module } from '@nestjs/common';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { ElectionAdminModule } from '../election-admin.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule,
    ElectionAdminModule,
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
