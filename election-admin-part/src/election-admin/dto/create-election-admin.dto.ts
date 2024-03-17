import {
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateElectionAdminDto {
  @IsString({ message: 'Username must consist of letters and numbers' })
  @MinLength(5, { message: 'Username must be at least 5 characters long' })
  @MaxLength(30, { message: 'Username cannot be longer than 30 characters' })
  @Matches(/^[a-zA-Z0-9]+$/, {
    message:
      'Username can only contain alphanumeric characters (letters and numbers)',
  })
  readonly username: string;

  @IsString({
    message:
      'Password must consist of letters, numbers, and special characters (!@#$%^&*)',
  })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(30, { message: 'Password cannot be longer than 30 characters' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/,
    {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*)',
    },
  )
  readonly password: string;

  @IsString({ message: 'NID must be valid' })
  @MaxLength(69, { message: 'NID cannot be longer than 69 characters' })
  readonly nid: string;

  @IsString({ message: 'Name must consist of letters' })
  @MaxLength(149, { message: 'Name cannot be longer than 149 characters' })
  readonly name: string;

  @IsString({ message: 'Address must consist of letters' })
  @MaxLength(249, { message: 'Address cannot be longer than 249 characters' })
  readonly address: string;

  @IsNotEmpty({ message: 'Contact must not be empty' })
  @IsMobilePhone('bn-BD')
  readonly contact: string;

  @IsEmail({}, { message: 'Email must be valid' })
  @IsString()
  readonly email: string;

  @MaxLength(29, { message: 'Gender cannot be longer than 29 characters' })
  @IsString()
  readonly gender: string;

  @MaxLength(29, { message: 'Religion cannot be longer than 29 characters' })
  @IsString()
  readonly religion: string;
}
