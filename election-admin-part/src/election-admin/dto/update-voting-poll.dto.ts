import { PartialType } from '@nestjs/mapped-types';
import { CreateVotingPollDto } from './create-voting-poll.dto';

export class UpdateVotingPollDto extends PartialType(CreateVotingPollDto) {}
