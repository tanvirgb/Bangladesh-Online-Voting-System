import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Voters } from "./entities/voters.entity";
import { Candidates } from "./entities/candidates.entity";
import { Sys_Admin } from "./entities/sys_admin.entity";
import { Centers } from "./entities/centers.entity";
import { Reports } from "./entities/reports.entity";
import { Candidate_Delete_Request } from "./entities/candidate_delete_request.entity";
import { Voting_Polls } from "./entities/voting_polls.entity";
import { Political_Parties } from "./entities/political_parties.entity";
import * as bcrypt from 'bcrypt';
import { Session } from "express-session";
import { MailerService } from "@nestjs-modules/mailer/dist";

@Injectable()
export class Sys_AdminService {
    constructor(
        @InjectRepository(Voters) private votersRepository: Repository<Voters>,
        @InjectRepository(Candidates) private candidatesRepository: Repository<Candidates>,
        @InjectRepository(Sys_Admin) private sys_adminRepository: Repository<Sys_Admin>,
        @InjectRepository(Voting_Polls) private voting_pollsRepository: Repository<Voting_Polls>,
        @InjectRepository(Centers) private centersRepository: Repository<Centers>,
        @InjectRepository(Reports) private reportsRepository: Repository<Reports>,
        @InjectRepository(Candidate_Delete_Request) private requestRepository: Repository<Candidate_Delete_Request>,
        @InjectRepository(Political_Parties) private partiesRepository: Repository<Political_Parties>,
        private readonly mailerService: MailerService,
        ) {}
    
    // Database Check and Return for User (System Administrator) Login
    async login(username: string, password: string): Promise<Sys_Admin | string> {
        try {
            // Check if provided Username is found in System Administrator Table
            const user = await this.sys_adminRepository.findOne({ where: { username } });

            // If not found, then -
            if (!user) {
                throw new UnauthorizedException ("Login Unsuccessful - Invalid Username.");
            }
            
            // If found, match password.
            const dbpassword = user.password;
            const passwordMatch = await bcrypt.compare(password, dbpassword);

            // If passwords match, then -
            if (passwordMatch) {
                return "Login Successfully!!";
            }

            // If passwords don't match, then -
            throw new NotFoundException ("Login Unsuccessful - Invalid Password.");
        } catch (error) {
            throw error;
        }
    }

    // Database Check and Return for Change Password
    async change_pass(username: string, old_pass: string, new_pass: string): Promise<Sys_Admin | string> {
        try {
            // Check if provided Username is found in System Adminstrator Table
            const user = await this.sys_adminRepository.findOne({ where: { username } });

            // If not found, then -
            if (!user) {
                throw new UnauthorizedException('Change Password Unsuccessful - Invalid Username.');
            }

            // If found, match password.
            const dbpassword = user.password;
            const passwordMatch = await bcrypt.compare(old_pass, dbpassword);

            // If passwords match, update Password.
            if (passwordMatch) {
                // Hash New Password
                const salt = await bcrypt.genSalt();
                const hassedpassed = await bcrypt.hash(new_pass, salt);

                user.password = hassedpassed;
                await this.sys_adminRepository.update(username, user);
                return "Changed Password Successfully!!";
            }

            // If passwords don't match, then -
            throw new NotFoundException('Change Password Unsuccessful - Invalid Password.');
        } catch (error) {
            throw error;
        }
    }

    // Database Check and Return Profile Information
    async view_profile(username: string): Promise<Sys_Admin | string> {
        try {
            // Check if provided Username is found in System Adminstrator Table
            const info = await this.sys_adminRepository.findOne({
                // Not selecting sensitive information (Such as - Password)
                select: ['username', 'nid', 'name', 'address', 'contact', 'email', 'gender', 'religion', 'image'],
                where: { username },
                relations: ['election_admin']
            });

            // If not found, then -
            if (!info) {
                throw new UnauthorizedException('Invalid Username.');
            }

            // If found, then -
            return info;
        } catch (error) {
            throw error;
        }
    }

    // Database Check and Update Profile Information
    async update_profile(username: string, updates: Partial<Sys_Admin>, image?: Express.Multer.File): Promise<Sys_Admin | string> {
        try {
            // Check if provided Username is found in System Adminstrator Table
            const info = await this.sys_adminRepository.findOne({where: {username}});

            // If not found, then -
            if (!info) {
                throw new UnauthorizedException('Invalid Username.');
            }
            
            // If found, update profile information.
            Object.assign(info, updates);

            // If Image provided, update.
            if (image) {
                info.image = image.buffer;
            }

            // Save all information in Database.
            await this.sys_adminRepository.save(info);
            return "User Profile Updated Successfully!!";
        }catch (error) {
            throw error;
        }
    }

    // Retrieve All Voters Data from Voters Table
    async view_voters(): Promise<Omit<Voters, 'password'>[] | string> {
        try {
            const voters = await this.votersRepository.find();
            return voters.map(({ password, ...rest }) => rest);
        } catch (error) {
            throw error;
        }
    }

    // Retrieve Information of the Voter using the Provided Username
    async search_voter(username: string): Promise<Voters | string> {
        try {
            // Check if provided Username is found in Voters Table
            const info = await this.votersRepository.findOne({
                // Not selecting sensitive information (Such as - Password)
                select: ['username', 'nid', 'name', 'address', 'contact', 'email', 'gender', 'religion', 'voted', 'select_offline_vote', 'image'],
                where: { username },
            });

            // If not found, then -
            if (!info) {
                throw new NotFoundException('Invalid Username.');
            }
            
            // If found, then -
            return info;
        } catch (error) {
            throw error;
        }
    }

    // Retrieve All Candidates Data from Candidates Table
    async view_candidates(): Promise<Omit<Candidates, 'password'>[] | string> {
        try {
            const candidates = await this.candidatesRepository.find();
            return candidates.map(({ password, ...rest }) => rest);
        } catch (error) {
            throw error;
        }
    }

    // Retrieve Information of the Candidate using the Provided Username
    async search_candidates(username: string): Promise<Candidates | string> {
        try {
            // Check if provided Username is found in Candidates Table
            const info = await this.candidatesRepository.findOne({
                // Not selecting sensitive information (Such as - Password)
                select: ['username', 'nid', 'name', 'address', 'contact', 'email', 'gender', 'religion', 'party_name', 'position', 'election_location', 'voted', 'select_offline_vote', 'account_grant', 'image'],
                where: { username },
            });

            // If not found, then -
            if (!info) {
                throw new NotFoundException('Invalid Username.');
            }
            
            // If found, then -
            return info;
        } catch (error) {
            throw error;
        }
    }

    // Database Check and Update Candidate Profile Information
    async update_candidates(username: string, updates: Partial<Sys_Admin>, image?: Express.Multer.File): Promise<Candidates | string> {
        try {
            // Check if provided Username is found in Candidate Table
            const info = await this.candidatesRepository.findOne({where: {username}});

            // If not found, then -
            if (!info) {
                throw new NotFoundException('Invalid Username.');
            }
            
            // If found, update profile information.
            Object.assign(info, updates);

            // If Image provided, update.
            if (image) {
                info.image = image.buffer;
            }

            // Save all information in Database.
            await this.candidatesRepository.save(info);
            return "Candidate Profile Updated Successfully!!";
        } catch (error) {
            throw error;
        }
    }

    // Database Check and Delete Candidate Profile
    async delete_candidate(username: string): Promise<Candidates | string> {
        try {
            // Check if provided Username is found in Candidate Table
            const info = await this.candidatesRepository.findOne({select: ['email'], where: {username}});

            // If found, delete candidate.
            if (info) {
                await this.candidatesRepository.delete(username);

                const { email } = info;
                await this.mailerService.sendMail ({
                    to: email,
                    subject: 'Notice for Vote Candidate Account Deletion.',
                    text: 'Your accounted has been deleted...',
                });

                return "Candidate Profile Succesfully Deleted!";
            } 

            // If not found, then -
            throw new NotFoundException('Invalid Username.');
        } catch (error) {
            throw error;
        }
    }

    // Retrieve All Candidate Delete Requests from Candidate Delete Requests Table
    async view_request(): Promise<Candidate_Delete_Request[] | string> {
        try {
            return this.requestRepository.find({ relations: ['sys_admin'] });
        } catch (error) {
            throw error;
        }
    }

    // Retrieve All Political Parties from Political Parties Table
    async view_parties(): Promise<Political_Parties[] | string> {
        try {
            return this.partiesRepository.find();
        } catch (error) {
            throw error;
        }
    }

    // Retrieve a Political Party's Information'
    async search_parties(party_id: number): Promise<Political_Parties | string> {
        try {
            // Check if provided Party ID is found in Political Party Table
            const info = await this.partiesRepository.findOneBy({party_id});

            // If not found, then -
            if (!info) {
                throw new NotFoundException('Invalid Party ID.');
            }
            
            // If found, then -
            return info;
        } catch (error) {
            throw error;
        }
    }

    // Database Check and Update Political Party Profile Information
    async update_parties(party_id: number, updates: Partial<Political_Parties>): Promise<Political_Parties | string> {
        try {
            // Check if provided Party ID is found in Political Party Table
            const info = await this.partiesRepository.findOne({where: {party_id}});

            // If not found, then -
            if (!info) {
                throw new NotFoundException('Invalid Party ID.');
            }

            // Delete Party ID Before Update
            delete updates.party_id;

            // If found, update profile information.
            Object.assign(info, updates);

            // Save all information in Database.
            await this.partiesRepository.save(info);
            return "Political Party Profile Updated Successfully!!";
        } catch (error) {
            throw error;
        }
    }

    // Retrieve All Voting Polls from Voting Polls Table
    async view_polls(): Promise<Voting_Polls[] | string> {
        try {
            return this.voting_pollsRepository.find();
        } catch (error) {
            throw error;
        }
    }

    // Add a Voting Center in Center table
    async add_center(center_id: number, add: Centers): Promise<Centers[] | string> {
        try {
            // Check if the provided Center ID is found in Center Table
            const info = await this.centersRepository.find({where: {center_id}});

            // If found, then -
            if (info.length === 1) {
                throw new  ConflictException ("Center ID already exists.");
            }
            
            // If not found, save.
            const newCenter = this.centersRepository.create(add);
            await this.centersRepository.save(newCenter);
            return "Vote Center Added Successfully!";
        } catch (error) {
            throw error;
        }
    }

    // Retrieve All Voting Centers from Centers Table
    async view_centers(): Promise<Centers[] | string> {
        try {
            return this.centersRepository.find();
        } catch (error) {
            throw error;
        }
    }

    // Database Check and Update Vote Center Information
    async update_center(center_id: number, updates: Partial<Centers>): Promise<Centers | string> {
        try {
            // Check if provided Center ID is found in Center Table
            const info = await this.centersRepository.findOne({where: {center_id}});

            // If not found, then -
            if (!info) {
                throw new NotFoundException('Invalid Center ID.');
            }

            // Delete Center ID Before Update
            delete updates.center_id;

            // If found, update center information.
            Object.assign(info, updates);

            // Save all information in Database.
            await this.centersRepository.save(info);
            return "Vote Center Details Updated Successfully!!";
        } catch (error) {
            throw error;
        }
    }

    // Database Check and Delete Vote Center Information
    async delete_center(center_id: number): Promise<Centers | string> {
        try {
            // Check if Center ID found in Centers Table
            const info = await this.centersRepository.find({where: {center_id}});

            // If found, delete.
            if (info.length === 1) {
                await this.centersRepository.delete(center_id);
                return "Vote Center Succesfully Deleted!";
            }

            // If not found, then -
            throw new NotFoundException('Invalid Center ID.');
        } catch (error) {
            throw error;
        }
    }

    // Retrieve All Reports from Reports Table
    async view_reports(): Promise<Reports[] | string> {
        try {
            return this.reportsRepository.find();
        } catch (error) {
            throw error;
        }
    }

    // Logout
    logout(session: Session): Promise<void> {
        return new Promise((resolve, reject) => {
            session.destroy((err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
}