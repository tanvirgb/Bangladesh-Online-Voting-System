import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ElectionAdminModule } from './election-admin/election-admin.module';

@Module({
  imports: [ElectionAdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
