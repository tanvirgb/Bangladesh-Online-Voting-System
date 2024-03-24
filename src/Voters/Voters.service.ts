import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository, UpdateResult } from 'typeorm';
import { VotersEntity } from './Voters.entity'; 
import { CandidatesEntity } from './Candidates.entity';
import { PoliticalPartyEntity } from './PoliticalParty.entity';
import { ReportsEntity } from './Reports.entity';
import { CentersEntity } from './Centers.entity';
import { VotingPollEntity } from './VotingPoll.entity';
import session, { Session } from 'express-session';
import { VotersDTO } from './Voters.dto';
import * as bcrypt from 'bcrypt';
import { MailerService } from "@nestjs-modules/mailer/dist"

@Injectable()
export class VotersService {
  jwtService: any;
  
   constructor(
    @InjectRepository(VotersEntity) private readonly votersRepository: Repository<VotersEntity>,
    @InjectRepository(CandidatesEntity) private readonly candidatesRepository: Repository<CandidatesEntity>,
    @InjectRepository(PoliticalPartyEntity) private readonly politicalpartyRepository: Repository<PoliticalPartyEntity>,
    @InjectRepository(ReportsEntity) private readonly reportsRepository: Repository<ReportsEntity>,
    @InjectRepository(CentersEntity) private readonly centersRepository: Repository<CentersEntity>,
    @InjectRepository(VotingPollEntity) private readonly votingPollRepository: Repository<VotingPollEntity>,private readonly mailerService: MailerService ) {}

   //Login 
   async login(username: string, password: string): Promise<any> {
    // Find the user by username
    const user = await this.votersRepository.findOne({ where: { username } });

    // If user not found, throw UnauthorizedException
    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    // Check if passwords match
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid username or password');
    }
  }

   //Registration 
   async createVoter(voterDTO: VotersDTO, image: Express.Multer.File): Promise<VotersEntity> {
    // Convert image to Buffer if needed
    const imageBuffer = image instanceof Buffer ? image : Buffer.from(image.buffer);
    const salt = await bcrypt.genSalt();
    const hassedpassed = await bcrypt.hash(voterDTO.password, salt);
    

    // Create a new VotersEntity instance
    const newVoter = new VotersEntity();
    
    // Assign values from voterDTO to the new voter entity
    newVoter.nid = voterDTO.nid;
    newVoter.username = voterDTO.username;
    newVoter.password = hassedpassed;
    newVoter.name = voterDTO.name;
    newVoter.address = voterDTO.address;
    newVoter.contact = voterDTO.contact;
    newVoter.email = voterDTO.email;
    newVoter.gender = voterDTO.gender;
    newVoter.religion = voterDTO.religion;
    newVoter.voted = voterDTO.voted || false; // Default value if not provided
    newVoter.select_offline_vote = voterDTO.select_offline_vote || false; // Default value if not provided
    newVoter.image = imageBuffer;
    
    await this.mailerService.sendMail({to: newVoter.email,subject: 'Congratulations',text: 'Welcome to Bangladesh Online Voting System!',});

    // Save the new voter entity to the database
    return this.votersRepository.save(newVoter);

  }
   //Select registration user type 

   //Verify user 

   //Forgot Password 

   //Change Password 

   //Upload Profile  

   //View Profile 
   async getProfileByUsername(username: string): Promise<VotersEntity> {
    const voter = await this.votersRepository.findOne({ 
      where: { username }, 
      select: ['nid', 'username', 'name', 'address', 'contact', 'email', 'gender', 'religion', 'image'] 
    });
  
    if (!voter) {
      throw new NotFoundException('Voter not found.');
    }
    
    return voter;
  }
  
   // Update Profile 
  async updateByUsername(sessionUsername: string, newData: Partial<VotersEntity>): Promise<VotersEntity> {
  try {
    // Find the user by username
    const user = await this.votersRepository.findOne({ where: { username: sessionUsername } });

    // If user not found, throw NotFoundException
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Update user's details with newData
    Object.assign(user, newData);

    // Save the updated user entity
    return this.votersRepository.save(user);
  } catch (error) {
    // Handle errors
    throw error;
  }
}

   //Delete Profile 
   async checkusername(sessionUsername: string): Promise<VotersEntity> {
    const user = await this.votersRepository.findOne({ where: { username: sessionUsername } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
   async deleteUser(sessionUsername: string): Promise<void> {
    const user = await this.votersRepository.findOne({ where: { username: sessionUsername } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.votersRepository.remove(user);
  }
   //View all registered candidates 
   async getCandidates(): Promise<CandidatesEntity[]> {
    return await this.candidatesRepository.createQueryBuilder('user')
        .select(['user.name', 'user.position','user.election_location']) // Selecting name, position, and location
        .getMany();
  }
   //View registered candidate’s details 
   async getCandidatesDetails(): Promise<CandidatesEntity[]> {
    return this.candidatesRepository.find({ relations: ['party'] });
  }

  //Search for candidates 
  async searchCandidatesByPartialName(Name: string): Promise<CandidatesEntity[]> {
    const candidates = await this.candidatesRepository.find({
      where: { name: Like(`%${Name}%`) }
    });

    if (!candidates.length) {
      throw new NotFoundException(`No candidates found with name containing: ${Name}`);
    }

    return candidates;
  }

   //Search for political parties 
   async searchPoliticalPartiesByPartialName(Name: string): Promise<PoliticalPartyEntity[]> {
    const politicalParties = await this.politicalpartyRepository.find({
      where: { name: Like(`%${Name}%`) }
    });

    if (!politicalParties.length) {
      throw new NotFoundException(`No political parties found with name containing: ${Name}`);
    }

    return politicalParties;
  }

   //View all political parties 
   async getPoliticalPartyDetails(): Promise<PoliticalPartyEntity[]> {
    return await this.politicalpartyRepository.createQueryBuilder('user')
        .getMany();
  }
   
   

   //Vote for candidates 

   async recordVote(candidateId: number, sessionUsername: string): Promise<void> {
    try {

      // Check if the candidate exists
      const candidate = await this.candidatesRepository.findOne({ where: { id: candidateId } });
      if (!candidate) {
        throw new NotFoundException('Candidate not found');
      }
      // Update the vote count for the candidate
      await this.votingPollRepository.increment({ id: candidateId }, 'vote_count', 1);

      const voter = await this.votersRepository.findOne({ where: { username: sessionUsername } });
      if (voter.voted) {
        throw new ConflictException('You have already voted');
    }
      voter.voted = true;
      this.votersRepository.save(voter);
      // Update the 'voted' boolean in the voter table
      
    } catch (error) {
      throw error; // Rethrow the error for handling in the controller
    }
  }

  
  

   //View predictive wins 

   //Report issues 
   async writeComplaint(user: string, issue: string): Promise<ReportsEntity> {
    if (!user || !issue) {
      throw new BadRequestException('username and issue are required');
    }
    this.reportsRepository.find({ relations: ['voter'] })
    const report = new ReportsEntity();
    report.user = user;
    report.issue = issue;
    return this.reportsRepository.save(report);
  }
   //Select voting center for offline voting 

   //Show voting centers 
   async getcenters(): Promise<CentersEntity[]> {
    return await this.centersRepository.find(); // Use find() to get all centers
  }
   //Logout 
   destroySession(session: Session): Promise<void> {
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
 
  //show voting poll
    async getVotes(): Promise<{ vote_count: number; username: string; location: string }[]> {
      return await this.votingPollRepository
        .createQueryBuilder('votingPoll')
        .select(['votingPoll.vote_count', 'votingPoll.username', 'votingPoll.location'])
        .getMany();
    }
 //show predictive wins
    async showwins(): Promise<{ prediction: number; username: string }[]> {
      return this.votingPollRepository.find({ relations: ['candidate'] });
    }
  //show selected offline centers
    async getCentersByLocation(location: string): Promise<CentersEntity[]> {
      return this.centersRepository.find({ where: { location } });
    }
  
}