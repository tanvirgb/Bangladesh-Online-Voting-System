import { PartialType } from '@nestjs/mapped-types';
import { CreateElectionAdminDto } from './create-election-admin.dto';

export class UpdateElectionAdminDto extends PartialType(CreateElectionAdminDto) {}
