import { IsArray, ValidateNested } from 'class-validator';
import { CreateElectionAdminDto } from './create-election-admin.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateElectionAdminDto extends PartialType(
  CreateElectionAdminDto,
) {}
