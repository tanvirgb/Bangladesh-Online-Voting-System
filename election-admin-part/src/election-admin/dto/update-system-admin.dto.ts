import { PartialType } from '@nestjs/mapped-types';
import { CreateSystemAdminDto } from './create-system-admin.dto';

export class UpdateSystemAdminDto extends PartialType(CreateSystemAdminDto) {}
