import { IsString,IsEmail,IsDate,IsUrl,IsPhoneNumber,NotContains, Matches, Length, IsNotEmpty, IsOptional, IsBoolean, IsInt, IsEnum } from "class-validator";
  export class VotersDTO{
    @Matches(/^[^0-9]*$/, {message: 'Name cannot have any number'})
    name:string;

    @Length(10,10,{message: 'NID must be 10 digits'} )
    nid:number

    @IsEmail({},{message: 'Invalid Email format'})
    email:string;

    @IsString()
    @NotContains('/^[^#,@,&,$]*$/', {message: 'Password cannot have special characters'})
    password:string;

    @IsPhoneNumber('BD', { message: 'Invalid Bangladeshi phone number' })
    contact: number;

    @IsNotEmpty({ message: 'Username cannot be empty' })
    @IsString({ message: 'Username must be string' })
    username: string;

    @IsNotEmpty({ message: 'Address cannot be empty' })
    @IsString()
    address: string;

    @IsNotEmpty({ message: 'Gender cannot be empty' })
    gender: string;

    @IsNotEmpty({ message: 'Religion cannot be empty' })
    religion: string;

    @IsOptional()
    @IsBoolean()
    voted: boolean;

   @IsOptional()
    @IsBoolean()
    select_offline_vote: boolean;

    image:Buffer;
}

  export class LoginDTO {
  
    @IsNotEmpty({ message: 'Username cannot be empty' })
    username: string;
  
    @IsNotEmpty({ message: 'Password cannot be empty' })
    password: string;
  }

  export class UpdateUserDTO {
  
    @IsOptional()
    @IsString()
    name?: string;
  
    @IsOptional()
    @IsEmail({},{message: 'Invalid Email format'})
    email?: string;
  
    @IsOptional()
    @IsPhoneNumber('BD',{ message: 'Invalid Bangladeshi phone number' })
    contact?: number;

  }
 
  export class ConfirmationDTO {
    @IsNotEmpty()
    @IsBoolean()
    confirmation: boolean;

}

  export class CreateIssueDto {
    @IsNotEmpty()
    @IsString()
    issue: string;

  }

  export class SearchCandidateByPartialNameDto {
    @IsString()
    Name: string;
  }

  export class SearchPoliticalPartyByPartialNameDto {
    @IsString()
    Name: string;
  }

  export class VoteDto {
    @IsNotEmpty()
    candidateId: number;
  
  }

  export class GetCentersDto {
    @IsNotEmpty()
    location: string;
  }
