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
  UploadedFile,
  UseInterceptors,
  Res,
  NotFoundException,
  Put,
  Req,
} from '@nestjs/common';
import { ElectionAdminService } from './election-admin.service';
import { CreateElectionAdminDto } from './dto/create-election-admin.dto';
import { UpdateElectionAdminDto } from './dto/update-election-admin.dto';
import { ElectionAdmin } from './entities/election-admin.entity';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { MulterError, diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreatePartyDto } from './dto/create-party.dto';
import { Party } from './entities/party.entity';
import { UpdatePartyDto } from './dto/update-party.dto';
import { CreateReportIssueDto } from './dto/create-report-issue.dto';
import { ReportIssue } from './entities/report.entity';
import { CreateSystemAdminDto } from './dto/create-system-admin.dto';
import { SystemAdmin } from './entities/system-admin.entity';
import { VotingPoll } from './entities/voting-poll.entity';
import { CreateVotingPollDto } from './dto/create-voting-poll.dto';
import { UpdateVotingPollDto } from './dto/update-voting-poll.dto';

@Controller('election-admin')
export class ElectionAdminController {
  constructor(
    private readonly adminService: ElectionAdminService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  login(@Request() req): { token: string } {
    const { id, username } = req.user;

    const electionAdmin: ElectionAdmin = {
      id,
      username,
      uniqueId: null,
      password: null,
      email: null,
      nid: null,
      profile: null,
      contacts: null,
    };

    req.session.user = { id, username };
    const token = this.authService.generateToken(electionAdmin);
    return { token };
  }

  @Put('forget-password')
  async changePassword(
    @Body('email') email: string,
    @Body() changeDto: CreateElectionAdminDto,
  ): Promise<{ message: string }> {
    const result = await this.adminService.changePassword(email, changeDto);
    if (!result) {
      throw new NotFoundException('Email not found');
    }
    return result;
  }

  @Post('registration')
  async createElectionAdmin(
    @Body(new ValidationPipe()) registrationDto: CreateElectionAdminDto,
  ): Promise<{ message: string; yourProfile: ElectionAdmin }> {
    return await this.adminService.createElectionAdmin(registrationDto);
  }

  @Get('view-profile')
  @UseGuards(AuthGuard('jwt'))
  async getOwnProfile(@Request() req): Promise<any> {
    const ownId = req.user.id;
    const ownProfile = await this.adminService.getOwnProfileById(ownId);
    if (!ownProfile) {
      throw new NotFoundException('Your profile not found');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...profile } = ownProfile;
    return profile;
  }

  @Put('update-profile')
  @UseGuards(AuthGuard('jwt'))
  async updateAdmin(
    @Body(new ValidationPipe()) updateDto: UpdateElectionAdminDto,
    @Req() req: any,
  ): Promise<{ message: string; personalDetails: ElectionAdmin }> {
    const admin = req.user;
    const updatedAdmin = await this.adminService.updateElectionAdmin(
      admin.id,
      updateDto,
    );
    if (!updatedAdmin) {
      throw new NotFoundException('Admin profile not found');
    }
    return updatedAdmin;
  }

  @Delete('delete-profile')
  @UseGuards(AuthGuard('jwt'))
  async deleteProfile(@Request() req): Promise<{ message: string } | any> {
    const ownId = req.user.id;
    return await this.adminService.deleteProfileById(ownId);
  }

  @Post('upload-profile-picture')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
          cb(null, true);
        else {
          cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
        }
      },
      limits: { fileSize: 10000000 },
      storage: diskStorage({
        destination: './uploads',
        filename: function (req, file, cb) {
          cb(null, Date.now() + `${file.originalname}`);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return 'File successfully uploaded!';
  }

  @Get('view-profile-picture/:fileName')
  @UseGuards(AuthGuard('jwt'))
  getImages(@Param('fileName') name, @Res() res) {
    res.sendFile(name, { root: './uploads' });
  }

  @Delete('delete-profile-picture/:fileName')
  @UseGuards(AuthGuard('jwt'))
  async deleteProfilePicture(
    @Param('fileName') fileName: string,
  ): Promise<{ message: string }> {
    return await this.adminService.deleteProfilePicture(fileName);
  }

  @Post('search-election-admin')
  @UseGuards(AuthGuard('jwt'))
  async getAdminProfile(
    @Body('username') username: string,
  ): Promise<ElectionAdmin> {
    const admin = await this.adminService.findElectionAdminByUsername(username);
    if (!admin) {
      throw new NotFoundException('Admin not found');
    }

    return admin;
  }

  @Post('add-system-admin')
  @UseGuards(AuthGuard('jwt'))
  async createSystemAdmin(
    @Body(new ValidationPipe()) addDto: CreateSystemAdminDto,
  ): Promise<{ message: string; systemAdmin: SystemAdmin }> {
    return await this.adminService.addSystemAdmin(addDto);
  }

  @Post('search-system-admin')
  @UseGuards(AuthGuard('jwt'))
  async findSystemAdminByUsername(
    @Body('username') username: string,
  ): Promise<SystemAdmin> {
    const admin = await this.adminService.findSystemAdminByUsername(username);
    if (!admin) {
      throw new NotFoundException("'System Admin' not found");
    }
    return admin;
  }

  @Delete('remove-system-admin')
  @UseGuards(AuthGuard('jwt'))
  async removeSystemAdmin(
    @Body('username') username: string,
  ): Promise<{ message: string }> {
    return this.adminService.removeSystemAdminByUsername(username);
  }

  @Post('add-party')
  @UseGuards(AuthGuard('jwt'))
  async addParty(
    @Body(new ValidationPipe()) addedDto: CreatePartyDto,
  ): Promise<{ message: string; party: Party }> {
    return await this.adminService.addParty(addedDto);
  }

  @Post('search-party')
  @UseGuards(AuthGuard('jwt'))
  async findPartyByUsername(
    @Body('partyName') partyName: string,
  ): Promise<Party> {
    const party = await this.adminService.findPartyByUsername(partyName);
    if (!party) {
      throw new NotFoundException("'Party' not found");
    }
    return party;
  }

  @Put('update-party')
  @UseGuards(AuthGuard('jwt'))
  async updateParty(
    @Body('partyName') partyName: string,
    @Body() updateDto: UpdatePartyDto,
  ): Promise<{ message: string; party: Party }> {
    return await this.adminService.updateParty(partyName, updateDto);
  }

  @Delete('remove-party')
  @UseGuards(AuthGuard('jwt'))
  async removeParty(
    @Body('partyName') partyName: string,
  ): Promise<{ message: string }> {
    return this.adminService.removePartyByPartyName(partyName);
  }

  @Post('add-voting-poll')
  @UseGuards(AuthGuard('jwt'))
  async addedVotingPoll(
    @Body(new ValidationPipe()) addedDto: CreateVotingPollDto,
  ): Promise<{ message: string; votingPoll: VotingPoll }> {
    return await this.adminService.createVotingPoll(addedDto);
  }

  @Post('search-voting-poll')
  @UseGuards(AuthGuard('jwt'))
  async findVotingPollByUsername(
    @Body('username') username: string,
  ): Promise<VotingPoll> {
    const votingPoll =
      await this.adminService.findVotingPollByUsername(username);
    if (!votingPoll) {
      throw new NotFoundException("'Voting Poll' not found");
    }
    return votingPoll;
  }

  @Put('update-voting-poll')
  @UseGuards(AuthGuard('jwt'))
  async updateVotingPoll(
    @Body('username') username: string,
    @Body() updateDto: UpdateVotingPollDto,
  ): Promise<{ message: string; votingPoll: VotingPoll }> {
    return await this.adminService.updateVotingPoll(username, updateDto);
  }

  @Delete('remove-voting-poll')
  @UseGuards(AuthGuard('jwt'))
  async removeVotingPoll(
    @Body('username') username: string,
  ): Promise<{ message: string }> {
    return this.adminService.removeVotingPollByUsername(username);
  }

  @Post('report-issue')
  @UseGuards(AuthGuard('jwt'))
  async reportIssue(
    @Body(new ValidationPipe()) reportDto: CreateReportIssueDto,
  ): Promise<{ message: string; yourIssue: ReportIssue }> {
    return await this.adminService.reportIssue(reportDto);
  }

  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  async logout(@Request() req): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      req.session.destroy((err) => {
        if (err) {
          console.error('Error destroying session:', err);
          reject(err);
        } else {
          resolve('You have logged out!');
        }
      });
    });
  }
}
