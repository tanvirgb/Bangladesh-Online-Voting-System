import { Module } from '@nestjs/common';
import { ReportIssue } from './entities/report.entity';
import { AuthService } from './auth/auth.service';
import { Candidate } from './entities/candidate.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CandidateContact } from './entities/candidate-contact.entity';
import { CandidateProfile } from './entities/candidate-profile.entity';
import { CandidateService } from './candidate.service';
import { CandidateController } from './candidate.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Candidate,
      CandidateProfile,
      CandidateContact,
      ReportIssue,
    ]),
  ],
  controllers: [CandidateController],
  providers: [CandidateService, AuthService],
  exports: [CandidateService],
})
export class CandidateModule {}
