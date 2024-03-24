import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
 
export class CreateReportIssueDto {
  @Matches(/^[a-zA-Z0-9]+$/, {
    message:
      'Username Should  Contain  Only Alphanumeric Characters (Letters And Numbers)',
  })
  @MaxLength(30, { message: 'Username Cannot Be Longer Than 30 Characters' })
  @MinLength(5, { message: 'Username Must Be At Least 5 Characters Long' })
  @IsString({ message: 'Username Must Consist Of Letters And Numbers' })
  @IsNotEmpty({ message: 'Username Field Should Not Be Empty' })
  readonly username: string;

  @MaxLength(69, { message: 'Email Should Not Be Longer More Than 69 Characters' })
  @IsEmail({}, { message: 'Email Should Be A valid Email' })
  @IsNotEmpty({ message: 'Email Field Should Not Be Empty' })
  readonly email: string;

  @MaxLength(999, {
    message: 'Issue Should Not Be Longer More Than 999 Characters',
  })
  @IsString({ message: 'Issue Should consist of characters' })
  @IsNotEmpty({ message: 'Issue Field Should not  be Empty.' })
  readonly issue: string;
}
