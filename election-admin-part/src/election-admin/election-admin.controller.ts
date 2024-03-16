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
} from '@nestjs/common';
import { ElectionAdminService } from './election-admin.service';
import { CreateElectionAdminDto } from './dto/create-election-admin.dto';
import { UpdateElectionAdminDto } from './dto/update-election-admin.dto';
import { ElectionAdmin } from './entities/election-admin.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('election-admin')
export class ElectionAdminController {
  constructor(private readonly electionAdminService: ElectionAdminService) {}

  @Post('registration')
  async createElectionAdmin(
    @Body(new ValidationPipe()) registrationDto: CreateElectionAdminDto,
  ): Promise<{ message: string; newElectionAdmin: ElectionAdmin }> {
    return await this.electionAdminService.createElectionAdmin(registrationDto);
  }

  @Post('login')
  @UseGuards(AuthGuard('local'))
  login(@Request() req): string {
    return req.user;
  }

  @Get()
  findAll() {
    return this.electionAdminService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.electionAdminService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateElectionAdminDto: UpdateElectionAdminDto,
  ) {
    return this.electionAdminService.update(+id, updateElectionAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.electionAdminService.remove(+id);
  }
}
