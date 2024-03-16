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
  ForbiddenException,
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
  @Get('getimage/:name')
  getImages(@Param('name') name, @Res() res) {
    res.sendFile(name, { root: './uploads' });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('search/election-admin/:id')
  async getAdminProfile(@Param('id') id: number): Promise<ElectionAdmin> {
    const admin = await this.adminService.getAdminProfile(id);
    if (!admin) {
      throw new NotFoundException('Admin not found');
    }

    return admin;
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
