import { Module } from '@nestjs/common';
import { ElectionAdminService } from './election-admin.service';
import { ElectionAdminController } from './election-admin.controller';

@Module({
  controllers: [ElectionAdminController],
  providers: [ElectionAdminService],
})
export class ElectionAdminModule {}
