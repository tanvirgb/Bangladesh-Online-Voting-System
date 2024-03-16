import { Module } from '@nestjs/common';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { ElectionAdminModule } from '../election-admin.module';

@Module({
  imports: [PassportModule, ElectionAdminModule],
  providers: [LocalStrategy],
})
export class AuthModule {}
