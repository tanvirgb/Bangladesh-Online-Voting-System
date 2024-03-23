import { IsString, MinLength, MaxLength, IsNotEmpty, Matches, IsEmail, Length, IsOptional, IsNumber, IsBooleanString } from "class-validator";
import { Transform } from 'class-transformer';
import { Sys_Admin } from "./entities/sys_admin.entity";
import { Voters } from "./entities/voters.entity";

// Verification of User (System Administrator) Login
export class LoginDTO {
    @IsNotEmpty({message: "No Username provided."})
    @IsString({message: "Invalid Username string format."})
    @MaxLength(8, {message: "Maximum 8 characters for Username."})
    username: string;

    @IsNotEmpty({message: "No Password provided."})
    @IsString({message: "Invalid Password string format."})
    @MinLength(5, {message: "Minimum 5 characters required for Password."})
    password: string;
}

// Verification of Information Provided to Change Password
export class Change_PassDTO {

    @IsNotEmpty({message: "No Old Password provided."})
    @IsString({message: "Invalid Old Password string format."})
    @MinLength(5, {message: "Minimum 5 characters required for Old Password."})
    old_pass: string;

    @IsNotEmpty({message: "No New Password provided."})
    @IsString({message: "Invalid New Password string format."})
    @MinLength(5, {message: "Minimum 5 characters required for New Password."})
    new_pass: string;
}

// Verification of Information Provided to Update User (System Adminstrator) Profile
export class Update_ProfileDTO {
    password: string;

    @IsOptional()
    @IsNotEmpty({ message: 'No NID provided.' })
    @IsString({message: 'NID must be a string.'})
    @Length(10, 10, {message: 'NID must be 10-digits.'})
    nid: number;
    
    @IsOptional()
    @IsNotEmpty({message: "No Name provided."})
    @IsString({message: "Invalid Name string format."})
    name: string;

    @IsOptional()
    @IsNotEmpty({message: "No Address provided."})
    @IsString({message: "Invalid Address string format."})
    address: string;

    @IsOptional()
    @IsNotEmpty({message: "No Contact provided."})
    @IsString({message: "Invalid Contact string format."})
    @Matches(/^01\d{9}$/, {message: "Invalid Contact number format."})
    contact: string;

    @IsOptional()
    @IsNotEmpty({message: "No Email provided."})
    @IsString({message: "Invalid Email string format."})
    @IsEmail({}, {message: "Invalid Email format."})
    email: string;

    @IsOptional()
    @IsNotEmpty({message: "No Gender provided."})
    @IsString({message: "Invalid Gender string format."})
    gender: string;

    @IsOptional()
    @IsNotEmpty({message: "No Religion provided."})
    @IsString({message: "Invalid Religion string format."})
    religion: string;

    @IsOptional()
    @IsNotEmpty({message: "No Image provided."})
    @Transform(({ value }) => Buffer.from(value, 'base64'))
    image: Buffer;
}

// Check if Username is Valid
export class Verify_UsernameDTO {
    @IsNotEmpty({message: "No Username provided."})
    @IsString({message: "Invalid Username string format."})
    @MaxLength(8, {message: "Maximum 8 characters for Username."})
    username: string;
}

// Verification of Information Provided to Update Candidate Profile
export class Update_CandidatesDTO {
    @IsNotEmpty({message: "No Username provided."})
    @IsString({message: "Invalid Username string format."})
    @MaxLength(8, {message: "Maximum 8 characters for Username."})
    username: string;

    password: string;

    @IsOptional()
    @IsNotEmpty({ message: 'No NID provided.' })
    @IsString({message: 'NID must be a string.'})
    @Length(10, 10, {message: 'NID must be 10-digits.'})
    nid: number;
    
    @IsOptional()
    @IsNotEmpty({message: "No Name provided."})
    @IsString({message: "Invalid Name string format."})
    name: string;

    @IsOptional()
    @IsNotEmpty({message: "No Address provided."})
    @IsString({message: "Invalid Address string format."})
    address: string;

    @IsOptional()
    @IsNotEmpty({message: "No Contact provided."})
    @IsString({message: "Invalid Contact string format."})
    @Matches(/^01\d{9}$/, {message: "Invalid Contact number format."})
    contact: string;

    @IsOptional()
    @IsNotEmpty({message: "No Email provided."})
    @IsString({message: "Invalid Email string format."})
    @IsEmail({}, {message: "Invalid Email format."})
    email: string;

    @IsOptional()
    @IsNotEmpty({message: "No Gender provided."})
    @IsString({message: "Invalid Gender string format."})
    gender: string;

    @IsOptional()
    @IsNotEmpty({message: "No Religion provided."})
    @IsString({message: "Invalid Religion string format."})
    religion: string;

    @IsOptional()
    @IsNotEmpty({message: "No Party Name provided."})
    @IsString({message: "Invalid Party Name string format."})
    party_name: string;

    @IsOptional()
    @IsNotEmpty({message: "No Position provided."})
    @IsString({message: "Invalid Position string format."})
    position: string;

    @IsOptional()
    @IsNotEmpty({message: "No Election Location provided."})
    @IsString({message: "Invalid Election string format."})
    election_location: string;

    @IsOptional()
    @IsNotEmpty({message: "No Voted Condition provided."})
    @IsBooleanString({message: "Invalid Voted Condition boolean string format."})
    voted: boolean;

    @IsOptional()
    @IsNotEmpty({message: "No Selection Offline Vote Condition provided."})
    @IsBooleanString({message: "Invalid Selection Offline Vote Condition boolean string format."})
    select_offline_vote: boolean;

    @IsOptional()
    @IsNotEmpty({message: "No Account Grant Condition provided."})
    @IsBooleanString({message: "Invalid Account Grant Condition boolean string format."})
    account_grant: boolean;

    @IsOptional()
    @IsNotEmpty({message: "No Image provided."})
    @Transform(({ value }) => Buffer.from(value, 'base64'))
    image: Buffer;
}

// Check if Party ID is Valid
export class Party_IdDTO {
    @IsNotEmpty({message: "No Party ID provided."})
    @IsString({message: 'Party ID must be a string.'})
    party_id: number;
}

// Verification of Information Provided to Update Political Party Profile
export class Update_PartiesDTO {
    @IsNotEmpty({message: "No Party ID provided."})
    @IsNumber({}, {message: "Invalid Party ID number format."})
    party_id: number;

    @IsOptional()
    @IsNotEmpty({message: "No Party Name provided."})
    @IsString({message: "Invalid Party Name string format."})
    party_name: string;

    @IsOptional()
    @IsNotEmpty({message: "No Founding Date provided."})
    @IsString({message: "Invalid Founding Date string format."})
    founding_date: string;

    @IsOptional()
    @IsNotEmpty({message: "No Party Description provided."})
    @IsString({message: "Invalid Party Description string format."})
    party_description: string;

    @IsOptional()
    @IsNotEmpty({message: "No Party Leader provided."})
    @IsString({message: "Invalid Party Leader string format."})
    party_leader: string;
}

// Verification of Information Provided for Vote Centers
export class Verify_CenterDTO {
    @IsNotEmpty({message: "No Center ID provided."})
    @IsNumber({}, {message: "Invalid Center ID number format."})
    center_id: number;

    @IsNotEmpty({message: "No Center Name provided."})
    @IsString({message: "Invalid Center Name string format."})
    center_name: string;

    @IsNotEmpty({message: "No Emergency Contact provided."})
    @IsString({message: "Invalid Emergency Contact string format."})
    @Matches(/^01\d{9}$/, {message: "Invalid Emergency Contact number format."})
    emergency_contact: string;

    @IsNotEmpty({message: "No Election Location provided."})
    @IsString({message: "Invalid Election Location string format."})
    election_location: string;

    sys_admin: Sys_Admin;
    voters: Voters;
}

// Verification of Information Provided to Update Vote Center Information
export class Update_CenterDTO {
    @IsNotEmpty({message: "No Center ID provided."})
    @IsNumber({}, {message: "Invalid Center ID number format."})
    center_id: number;

    @IsOptional()
    @IsNotEmpty({message: "No Center Name provided."})
    @IsString({message: "Invalid Center Name string format."})
    center_name: string;

    @IsOptional()
    @IsNotEmpty({message: "No Emergency Contact provided."})
    @IsString({message: "Invalid Emergency Contact string format."})
    @Matches(/^01\d{9}$/, {message: "Invalid Emergency Contact number format."})
    emergency_contact: string;

    @IsOptional()
    @IsNotEmpty({message: "No Election Location provided."})
    @IsString({message: "Invalid Election Location string format."})
    election_location: string;
}

// Check if Center ID is Valid
export class Center_IdDTO {
    @IsNotEmpty({message: "No Center ID provided."})
    @IsNumber({}, {message: "Invalid Center ID number format."})
    center_id: number;
}