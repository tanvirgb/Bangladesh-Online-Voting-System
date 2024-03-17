import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreatePartyDto {
  @IsNotEmpty({ message: 'Party name must not be empty' })
  @IsString({ message: 'Party name must be a string' })
  @MaxLength(200, {
    message: 'Party name cannot be longer than 200 characters',
  })
  readonly partyName: string;

  @IsNotEmpty({ message: 'Founding date must not be empty' })
  @IsString({ message: 'Founding date must be a string' })
  @MaxLength(70, {
    message: 'Founding date cannot be longer than 70 characters',
  })
  readonly foundingDate: string;

  @IsNotEmpty({ message: 'Party description must not be empty' })
  @IsString({ message: 'Party description must be a string' })
  @MaxLength(1000, {
    message: 'Party description cannot be longer than 1000 characters',
  })
  readonly partyDescription: string;

  @IsNotEmpty({ message: 'Party leader must not be empty' })
  @IsString({ message: 'Party leader must be a string' })
  @MaxLength(150, {
    message: 'Party leader name cannot be longer than 150 characters',
  })
  readonly partyLeader: string;
}
