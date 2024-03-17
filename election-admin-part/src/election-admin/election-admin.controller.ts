import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
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

@Controller('election-admin')
export class ElectionAdminController {
  constructor(
    private readonly adminService: ElectionAdminService,
    private readonly authService: AuthService,
  ) {}

  @Post('registration')
  async createElectionAdmin(
    @Body(new ValidationPipe()) registrationDto: CreateElectionAdminDto,
  ): Promise<{ message: string; newElectionAdmin: ElectionAdmin }> {
    return await this.adminService.createElectionAdmin(registrationDto);
  }
  @Post('login')
  @UseGuards(AuthGuard('local'))
  login(@Request() req): string {
    const { id, username } = req.user;
    const electionAdmin: ElectionAdmin = {
      id,
      username,
      uniqueId: null,
      password: null,
      nid: null,
      profile: null,
      contacts: null,
    };

    return this.authService.generateToken(electionAdmin);
  }

  @Post('upload')
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

  @UseGuards(AuthGuard('jwt'))
  @Get('get-image/:name')
  getImages(@Param('name') name, @Res() res) {
    res.sendFile(name, { root: './uploads' });
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('search/election-admin')
  async getAdminProfile(
    @Body('username') username: string,
  ): Promise<ElectionAdmin> {
    const admin = await this.adminService.getAdminProfileByUsername(username);
    if (!admin) {
      throw new NotFoundException('Admin not found');
    }

    return admin;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('view-profile')
  async getOwnProfile(@Request() req): Promise<any> {
    const ownId = req.user.id;
    const ownProfile = await this.adminService.getOwnProfileById(ownId);
    if (!ownProfile) {
      throw new NotFoundException('Your profile not found');
    }
    const { password, ...profile } = ownProfile;
    return profile;
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('update-profile')
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

  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateElectionAdminDto: UpdateElectionAdminDto,
  ) {
    return this.adminService.update(+id, updateElectionAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
