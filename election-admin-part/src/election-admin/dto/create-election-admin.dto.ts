import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateElectionAdminDto {
  @IsString()
  @MinLength(5, { message: 'Username must be at least 5 characters long' })
  @MaxLength(30, { message: 'Username cannot be longer than 30 characters' })
  @Matches(/^[a-zA-Z0-9]+$/, {
    message: 'Username can only contain alphanumeric characters',
  })
  readonly username: string;

  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(30, { message: 'Password cannot be longer than 30 characters' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, and one number',
  })
  @IsString()
  readonly password: string;

  @IsString({ message: 'NID must be a string' })
  @MaxLength(69, { message: 'NID cannot be longer than 69 characters' })
  readonly nid: string;

  @IsString({ message: 'Name must be a string' })
  @MaxLength(149, { message: 'Name cannot be longer than 149 characters' })
  @IsString()
  readonly name: string;

  @MaxLength(249, { message: 'Address cannot be longer than 249 characters' })
  @IsString()
  readonly address: string;

  @MaxLength(24, { message: 'Contact cannot be longer than 24 characters' })
  @IsString()
  readonly contact: string;

  @IsEmail({}, { message: 'Invalid email format' })
  @MaxLength(70, { message: 'Email cannot be longer than 70 characters' })
  @IsString()
  readonly email: string;

  @MaxLength(29, { message: 'Gender cannot be longer than 29 characters' })
  @IsString()
  readonly gender: string;

  @MaxLength(29, { message: 'Religion cannot be longer than 29 characters' })
  @IsString()
  readonly religion: string;
}
