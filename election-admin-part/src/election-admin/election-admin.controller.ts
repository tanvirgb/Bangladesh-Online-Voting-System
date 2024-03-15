import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ElectionAdminService } from './election-admin.service';
import { CreateElectionAdminDto } from './dto/create-election-admin.dto';
import { UpdateElectionAdminDto } from './dto/update-election-admin.dto';

@Controller('election-admin')
export class ElectionAdminController {
  constructor(private readonly electionAdminService: ElectionAdminService) {}

  @Post()
  create(@Body() createElectionAdminDto: CreateElectionAdminDto) {
    return this.electionAdminService.create(createElectionAdminDto);
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
  update(@Param('id') id: string, @Body() updateElectionAdminDto: UpdateElectionAdminDto) {
    return this.electionAdminService.update(+id, updateElectionAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.electionAdminService.remove(+id);
  }
}
