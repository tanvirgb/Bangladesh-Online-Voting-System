import {
    IsEmail,
    IsMobilePhone,
    IsNotEmpty,
    IsString,
    Matches,
    MaxLength,
    MinLength,
  } from 'class-validator';
  
  export class CreateCandidateDto {
    @Matches(/^[a-zA-Z0-9]+$/, {
      message:
        'Username Must Only Contain Alphanumeric Characters (Letters And Numbers)',
    }) 
    @MaxLength(50, { message: 'Username Should Not Be Longer More Than 50 Characters' })
    @MinLength(3, { message: 'Username Should Be At Least 3 Characters Long' })
    @IsString({ message: 'Username Should Consist Of Letters And Numbers' })
    @IsNotEmpty({ message: 'Username Field Should Not Be Empty' })
    readonly username: string;
  
    @Matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/,
      {
        message:
          'Password Should Contain At Least One Uppercase Letter, One Lowercase Letter, One Number, And One Special Character (!@#$%^&*)',
      },
    )
    @MaxLength(50, { message: 'Password Cannot Be longer More Than 50 Characters' })
    @MinLength(8, { message: 'Password Should Be At Least 8 Characters Long' })
    @IsString({
      message:
        'Password Should Consist of Letters, Numbers, And Special Characters (!@#$%^&*)',
    })
    @IsNotEmpty({ message: 'Password Field Should Not Be Empty' })
    readonly password: string;
  
    @MaxLength(30, { message: 'NID Cannot Be Longer More Than 30 Digits' })
    @IsString({ message: 'NID Should Consist Of Digits' })
    @IsNotEmpty({ message: 'NID Field Should Not Be Empty' })
    readonly nid: string;
  
    @MaxLength(100, { message: 'Name Should Not Be Longer Than 100 Characters' })
    @IsString({ message: 'Name Must Consist Of Characters' })
    @IsNotEmpty({ message: 'Name Field Should Not Be Empty' })
    readonly name: string;
  
    @MaxLength(200, { message: 'Address Should Not Be Longer More Than 200 Characters' })
    @IsString({ message: 'Address Should Consist Of Characters' })
    @IsNotEmpty({ message: 'Address Field Should Not Be Empty' })
    readonly address: string;
  
    @MaxLength(15, { message: 'Contact Cannot Be Longer More Than 15 Digits' })
    @IsMobilePhone('bn-BD')
    @IsNotEmpty({ message: 'Contact Should Not Ne Empty' })
    readonly contact: string;
  
    @MaxLength(50, { message: 'Email Cannot Be Longer More Than 50 Characters' })
    @IsEmail({}, { message: 'Email Should Be A  Valid Email Address' })
    @IsNotEmpty({ message: 'Email Field Should Not Be Empty' })
    readonly email: string;
  
    @MaxLength(20, { message: 'Gender Cannot Be Longer Than 20 Letters' })
    @IsString({ message: 'Gender Must Consist Of Letters' })
    @IsNotEmpty({ message: 'Gender Field Should Not Be Empty' })
    readonly gender: string;
  
    @MaxLength(20, { message: 'Religion Cannot Be Longer More Than 20 Letters' })
    @IsString({ message: 'Religion Should Consist Of Letters' })
    @IsNotEmpty({ message: 'Religion Field Should not be empty' })
    readonly religion: string;
  }
  