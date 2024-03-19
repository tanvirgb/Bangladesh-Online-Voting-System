import {
  IsString,
  MaxLength,
  MinLength,
  Matches,
  IsNotEmpty,
} from 'class-validator';

export class CreateVotingPollDto {
  @Matches(/^[a-zA-Z0-9]+$/, {
    message:
      '"Username" can only contain alphanumeric characters (letters and numbers)',
  })
  @MaxLength(39, { message: '"Username" cannot be longer than 39 characters' })
  @MinLength(5, { message: 'Username must be at least 5 characters long' })
  @IsString({ message: 'Username must consist of letters and numbers' })
  @IsNotEmpty({ message: 'Username field can not be empty' })
  readonly username: string;

  @MaxLength(149, {
    message: 'Candidate Name" cannot be longer than 149 characters',
  })
  @IsString({ message: '"Candidate Name" must consist of characters' })
  @IsNotEmpty({ message: '"Candidate Name" field can not be empty' })
  readonly candidateName: string;

  @MaxLength(199, {
    message: '"Party Name" cannot be longer than 199 characters',
  })
  @IsString({ message: '"Party Name" must consist of characters' })
  @IsNotEmpty({ message: '"Party Name" field can not be empty' })
  readonly partyName: string;

  @MaxLength(99, {
    message: '"Vote Count" cannot be longer than 99 characters',
  })
  @IsString({ message: '"Vote Count" must consist of characters' })
  @IsNotEmpty({ message: '"Name" field can not be empty' })
  readonly voteCount: string;

  @MaxLength(249, {
    message: '"Election Location" cannot be longer than 249 characters',
  })
  @IsString({ message: '"Election Location" must consist of characters' })
  @IsNotEmpty({ message: '"Election Location" field can not be empty' })
  readonly electionLocation: string;

  @MaxLength(49, {
    message: '""Prediction"" cannot be longer than 49 characters',
  })
  @IsString({ message: '"Prediction" must consist of characters' })
  @IsNotEmpty({ message: '"Prediction" field can not be empty' })
  readonly prediction: string;
}
