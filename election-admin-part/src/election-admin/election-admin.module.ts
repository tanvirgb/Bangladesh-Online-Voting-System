import { Module } from '@nestjs/common';
import { ElectionAdminService } from './election-admin.service';
import { ElectionAdminController } from './election-admin.controller';
import { ElectionAdminProfile } from './entities/election-admin-profile.entity';
import { ElectionAdmin } from './entities/election-admin.entity';
import { ElectionAdminContact } from './entities/election-admin-contact.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Party } from './entities/party.entity';
import { ReportIssue } from './entities/report.entity';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ElectionAdmin,
      ElectionAdminProfile,
      ElectionAdminContact,
      Party,
      ReportIssue,
    ]),
  ],
  controllers: [ElectionAdminController],
  providers: [ElectionAdminService, AuthService],
  exports: [ElectionAdminService],
})
export class ElectionAdminModule {}
