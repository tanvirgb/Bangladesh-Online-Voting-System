import { Module } from '@nestjs/common';
import { Sys_AdminController } from './sys_admin.controller';
import { Sys_AdminService } from './sys_admin.service';
import { Election_Admin } from "./entities/election_admin.entity";
import { Voters } from "./entities/voters.entity";
import { Candidates } from "./entities/candidates.entity";
import { Sys_Admin } from "./entities/sys_admin.entity";
import { Centers } from "./entities/centers.entity";
import { Reports } from "./entities/reports.entity";
import { Candidate_Delete_Request } from "./entities/candidate_delete_request.entity";
import { Voting_Polls } from "./entities/voting_polls.entity";
import { Political_Parties } from "./entities/political_parties.entity";
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from "@nestjs-modules/mailer";

@Module({
  imports: [Election_Admin,
            Voters,
            Candidates,
            Sys_Admin,
            Centers,
            Reports,
            Candidate_Delete_Request, 
            Voting_Polls,
            Political_Parties,
            TypeOrmModule.forFeature([Election_Admin,
              Voters,
              Candidates,
              Sys_Admin,
              Centers,
              Reports,
              Candidate_Delete_Request,
              Voting_Polls,
              Political_Parties,
            ]),
            MailerModule.forRoot({
              transport: {
                host: 'smtp.gmail.com',
                port: 465,
                ignoreTLS: true,
                secure: true,
                auth: {
                  user: '',
                  pass: ''
                },
              }
            })
          ],
  controllers: [Sys_AdminController],
  providers: [Sys_AdminService],
})
export class Sys_AdminModule {}
