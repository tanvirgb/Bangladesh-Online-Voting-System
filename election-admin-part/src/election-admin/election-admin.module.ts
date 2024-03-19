import { Module } from '@nestjs/common';
import { ElectionAdminService } from './election-admin.service';
import { ElectionAdminController } from './election-admin.controller';
import { ElectionAdminProfile } from './entities/election-admin-profile.entity';
import { ElectionAdmin } from './entities/election-admin.entity';
import { ElectionAdminContact } from './entities/election-admin-contact.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Party } from './entities/party.entity';
import { ReportIssue } from './entities/report.entity';
import { AuthService } from './auth/auth.service';
import { SystemAdmin } from './entities/system-admin.entity';
import { SystemAdminProfile } from './entities/system-admin-profile.entity';
import { SystemAdminContact } from './entities/system-admin-contact.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ElectionAdmin,
      ElectionAdminProfile,
      ElectionAdminContact,
      SystemAdmin,
      SystemAdminProfile,
      SystemAdminContact,
      Party,
      ReportIssue,
    ]),
  ],
  controllers: [ElectionAdminController],
  providers: [ElectionAdminService, AuthService],
  exports: [ElectionAdminService],
})
export class ElectionAdminModule {}
