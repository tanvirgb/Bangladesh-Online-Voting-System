import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ValidationPipe,
  UseGuards,
  Request,
  NotFoundException,
  Put,
  Req,
  Res,
} from '@nestjs/common'; 
import { CandidateService } from './candidate.service';
import { AuthService } from './auth/auth.service';
import { CreateReportIssueDto } from './dto/create-report-issue.dto';
import { ReportIssue } from './entities/report.entity';
import { updateCandidateDto } from './dto/update-candidate.dto';
import { Candidate } from './entities/candidate.entity';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('candidate')
export class CandidateController {
  constructor(
    private readonly adminService: CandidateService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  login(@Request() req): string {
    const { id, username } = req.user;
    const candidate: Candidate = {
      id,
      username,
      uniqueId: null,
      password: null,
      nid: null,
      profile: null,
      contacts: null,
    };

    return this.authService.generateToken(req.Candidate);
  }

  @Post('registration')
  async createCandidate(
    @Body(new ValidationPipe()) registrationDto: CreateCandidateDto,
  ): Promise<{ message: string; yourProfile: Candidate }> {
    return await this.adminService.createCandidate(registrationDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('view-profile')
  async getOwnProfile(@Request() req): Promise<any> {
    const ownId = req.user.id;
    const ownProfile = await this.adminService.getOwnProfileById(ownId);
    if (!ownProfile) {
      throw new NotFoundException('profile Not found');
    }
    const { password, ...profile } = ownProfile;
    return profile;
  }

  @Put('update-profile')
  @UseGuards(AuthGuard('jwt'))
  async updateCandidate(
    @Body(new ValidationPipe()) updateDto: updateCandidateDto,
    @Req() req: any,
  ): Promise<{ message: string; personalDetails: Candidate }> {
    const admin = req.user;
    const updateCandidate = await this.adminService.updateCandidate(
      admin.id,
      updateDto,
    );
    if (!updateCandidate) {
      throw new NotFoundException('Admin profile not found');
    }
    return updateCandidate;
  }

  @Delete('delete-profile/:id')
  @UseGuards(AuthGuard('jwt'))
  async deleteProfile(@Param('id') id: number): Promise<{ message: string }> {
    return await this.adminService.deleteProfileById(+id);
  }

  @Post('report-issue')
  async reportIssue(
    @Body(new ValidationPipe()) reportDto: CreateReportIssueDto,
  ): Promise<{ message: string; yourIssue: ReportIssue }> {
    return await this.adminService.reportIssue(reportDto);
  }
}


