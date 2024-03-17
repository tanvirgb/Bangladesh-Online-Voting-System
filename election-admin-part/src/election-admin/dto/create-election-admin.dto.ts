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
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/,
    {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*)',
    },
  )
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(30, { message: 'Password cannot be longer than 30 characters' })
  @IsString({
    message:
      'Password must consist of letters, numbers, and special characters (!@#$%^&*)',
  })
  @IsNotEmpty({ message: 'Password field must not be empty' })
  readonly password: string;

  @MaxLength(69, { message: 'NID cannot be longer than 69 characters' })
  @IsString({ message: 'NID must be valid' })
  @IsNotEmpty({ message: 'NID field must not be empty' })
  readonly nid: string;

  @MaxLength(149, { message: 'Name cannot be longer than 149 characters' })
  @IsString({ message: 'Name must consist of letters' })
  @IsNotEmpty({ message: 'Name field must not be empty' })
  readonly name: string;

  @MaxLength(249, { message: 'Address cannot be longer than 249 characters' })
  @IsString({ message: 'Address must consist of letters' })
  @IsNotEmpty({ message: 'Address field must not be empty' })
  readonly address: string;

  @IsMobilePhone('bn-BD')
  @IsNotEmpty({ message: 'Contact must not be empty' })
  readonly contact: string;

  @IsEmail({}, { message: 'Email must be valid' })
  @IsString()
  @IsNotEmpty({ message: 'Email field must not be empty' })
  readonly email: string;

  @MaxLength(29, { message: 'Gender cannot be longer than 29 characters' })
  @IsString({ message: 'Gender must consist of letters' })
  @IsNotEmpty({ message: 'Gender field must not be empty' })
  readonly gender: string;

  @MaxLength(29, { message: 'Religion cannot be longer than 29 characters' })
  @IsString({ message: 'Religion must consist of letters' })
  @IsNotEmpty({ message: 'Religion field must not be empty' })
  readonly religion: string;
}
