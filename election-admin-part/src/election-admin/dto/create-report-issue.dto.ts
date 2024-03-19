import {
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateReportIssueDto {
  @Matches(/^[a-zA-Z0-9]+$/, {
    message:
      'Username can only contain alphanumeric characters (letters and numbers)',
  })
  @MaxLength(39, { message: '"Username" cannot be longer than 39 characters' })
  @MinLength(5, { message: '"Username" must be at least 5 characters long' })
  @IsString({ message: '"Username" must consist of letters and numbers' })
  @IsNotEmpty({ message: '"Username" field can not be empty' })
  readonly username: string;

  @MaxLength(89, { message: '"Email" cannot be longer than 89 characters' })
  @IsEmail({}, { message: '"Email" must be valid' })
  @IsNotEmpty({ message: '"Email" field can not be empty' })
  readonly email: string;

  @MaxLength(999, {
    message: '"Issue" cannot be longer than 999 characters',
  })
  @IsString({ message: '"Issue" must consist of characters' })
  @IsNotEmpty({ message: '"Issue" field can not be empty' })
  readonly issue: string;
}
