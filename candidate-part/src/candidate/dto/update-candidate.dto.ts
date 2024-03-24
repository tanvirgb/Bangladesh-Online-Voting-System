import { PartialType } from '@nestjs/mapped-types';
import { CreateCandidateDto } from './create-candidate.dto';

export class updateCandidateDto extends PartialType(
  CreateCandidateDto,
) {}
