import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { VoterModule } from './user/voter.module';
import { User1Module } from './user1/user1.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VotersModule } from './Voters/Voters.module';



@Module({
  imports: [ VotersModule,TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'abcde',
    database: 'Bangladesh_Online_Voting_System',
    autoLoadEntities: true,
    synchronize: true,
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
