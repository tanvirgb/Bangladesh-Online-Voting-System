import { Module } from '@nestjs/common';
import { ElectionAdminService } from './election-admin.service';
import { ElectionAdminController } from './election-admin.controller';
import { ElectionAdminProfile } from './entities/election-admin-profile.entity';
import { ElectionAdmin } from './entities/election-admin.entity';
import { ElectionAdminContact } from './entities/election-admin-contact.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Party } from './entities/party.entity';
import { Report } from './entities/report.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ElectionAdmin,
      ElectionAdminProfile,
      ElectionAdminContact,
      Party,
      Report,
    ]),
  ],
  controllers: [ElectionAdminController],
  providers: [ElectionAdminService],
})
export class ElectionAdminModule {}
