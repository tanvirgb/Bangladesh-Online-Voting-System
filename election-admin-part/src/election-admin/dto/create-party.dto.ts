import {
  IsMobilePhone,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreatePartyDto {
  @MaxLength(199, {
    message: '"Party Name" cannot be longer than 199 characters',
  })
  @IsString({ message: '"Party Name" must consist of characters' })
  @IsNotEmpty({ message: '"Party Name" field can not be empty' })
  readonly partyName: string;

  @MaxLength(149, {
    message: '"Party Leader Name" cannot be longer than 149 characters',
  })
  @IsString({ message: '"Party Leader Name" must consist of characters' })
  @IsNotEmpty({ message: '"Party Leader" field can not be empty' })
  readonly partyLeader: string;

  @MaxLength(999, {
    message: '"Party Description" cannot be longer than 999 characters',
  })
  @IsString({ message: '"Party Description" must consist of characters' })
  @IsNotEmpty({ message: '"Party Description" field can not be empty' })
  readonly partyDescription: string;

  @MaxLength(89, {
    message: '"Founding Date" cannot be longer than 89 characters',
  })
  @IsString({ message: '"Founding Date" must consist of characters' })
  @IsNotEmpty({ message: '"Founding Date" can not be empty' })
  readonly foundingDate: string;

  @MaxLength(24, { message: '"Contact" cannot be longer than 24 digits' })
  @IsMobilePhone('bn-BD')
  @IsNotEmpty({ message: '"Contact" can not be empty' })
  readonly contact: string;
}
