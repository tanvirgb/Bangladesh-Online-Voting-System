import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateElectionAdminDto } from './dto/create-election-admin.dto';
import { UpdateElectionAdminDto } from './dto/update-election-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ElectionAdminContact } from './entities/election-admin-contact.entity';
import { ElectionAdminProfile } from './entities/election-admin-profile.entity';
import { Repository } from 'typeorm';
import { ElectionAdmin } from './entities/election-admin.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Party } from './entities/party.entity';
import { CreatePartyDto } from './dto/create-party.dto';
import { UpdatePartyDto } from './dto/update-party.dto';
import * as fs from 'fs';
import { CreateReportIssueDto } from './dto/create-report-issue.dto';
import { ReportIssue } from './entities/report.entity';
import { SystemAdmin } from './entities/system-admin.entity';
import { SystemAdminContact } from './entities/system-admin-contact.entity';
import { SystemAdminProfile } from './entities/system-admin-profile.entity';
import { CreateSystemAdminDto } from './dto/create-system-admin.dto';
import { CreateVotingPollDto } from './dto/create-voting-poll.dto';
import { VotingPoll } from './entities/voting-poll.entity';
import { createSecretKey } from 'crypto';

@Injectable()
export class ElectionAdminService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(ElectionAdmin)
    private readonly electionAdminRepository: Repository<ElectionAdmin>,
    @InjectRepository(ElectionAdminProfile)
    private readonly electionAdminProfileRepository: Repository<ElectionAdminProfile>,
    @InjectRepository(ElectionAdminContact)
    private readonly electionAdminContactRepository: Repository<ElectionAdminContact>,
    @InjectRepository(SystemAdmin)
    private readonly systemAdminRepository: Repository<SystemAdmin>,
    @InjectRepository(SystemAdminProfile)
    private readonly systemAdminProfileRepository: Repository<SystemAdminProfile>,
    @InjectRepository(SystemAdminContact)
    private readonly systemAdminContactRepository: Repository<SystemAdminContact>,
    @InjectRepository(Party)
    private readonly partyRepository: Repository<Party>,
    @InjectRepository(VotingPoll)
    private readonly votingPollRepository: Repository<VotingPoll>,
    @InjectRepository(ReportIssue)
    private readonly reportRepository: Repository<ReportIssue>,
  ) {}

  async findByUsername(username: string): Promise<ElectionAdmin | undefined> {
    return await this.electionAdminRepository.findOne({ where: { username } });
  }

  async changePassword(
    email: string,
    changeDto: CreateElectionAdminDto,
  ): Promise<{ message: string }> {
    const existingAdmin = await this.electionAdminRepository.findOne({
      where: { email },
    });
    if (!existingAdmin) {
      throw new NotFoundException('Email not found');
    }

    const hashedPassword = await bcrypt.hash(changeDto.password, 10);
    existingAdmin.password = hashedPassword;

    const changedPassword =
      await this.electionAdminRepository.save(existingAdmin);

    if (!changedPassword) {
      throw new NotFoundException('Password reset failed');
    }

    return { message: 'Your password has been successfully changed!' };
  }

  async createElectionAdmin(
    registrationDto: CreateElectionAdminDto,
  ): Promise<{ message: string; yourProfile: ElectionAdmin }> {
    const adminProfile = new ElectionAdminProfile();
    adminProfile.name = registrationDto.name;
    adminProfile.address = registrationDto.address;
    adminProfile.gender = registrationDto.gender;
    adminProfile.religion = registrationDto.religion;

    const savedProfile =
      await this.electionAdminProfileRepository.save(adminProfile);

    const adminContact = new ElectionAdminContact();
    adminContact.contact = registrationDto.contact;
    adminContact.admin = savedProfile.admin;
    const savedContact =
      await this.electionAdminContactRepository.save(adminContact);

    const admin = new ElectionAdmin();
    admin.username = registrationDto.username;
    const hashedPassword = await bcrypt.hash(registrationDto.password, 10);
    admin.password = hashedPassword;
    admin.email = registrationDto.email;
    admin.nid = registrationDto.nid;
    admin.profile = savedProfile;
    admin.contacts = [savedContact];

    const savedAdmin = await this.electionAdminRepository.save(admin);

    if (!savedAdmin) {
      throw new NotFoundException('Registration failed');
    }
    return {
      message: 'Registration successful!',
      yourProfile: savedAdmin,
    };
  }

  async getOwnProfileById(id: number): Promise<ElectionAdmin> {
    return this.electionAdminRepository.findOne({
      where: { id },
      relations: ['profile', 'contacts'],
    });
  }

  async updateElectionAdmin(
    id: number,
    updateDto: UpdateElectionAdminDto,
  ): Promise<{ message: string; personalDetails: ElectionAdmin }> {
    const existingAdmin = await this.electionAdminRepository.findOne({
      where: { id },
      relations: ['profile'],
    });
    if (!existingAdmin) {
      throw new NotFoundException("'Election Admin' not found'");
    }

    existingAdmin.username = updateDto.username;
    const hashedPassword = await bcrypt.hash(updateDto.password, 10);
    existingAdmin.password = hashedPassword;
    existingAdmin.nid = updateDto.nid;
    existingAdmin.email = updateDto.email;
    existingAdmin.profile.name = updateDto.name;
    existingAdmin.profile.address = updateDto.address;
    existingAdmin.profile.gender = updateDto.gender;
    existingAdmin.profile.religion = updateDto.religion;

    const updatedAdmin = await this.electionAdminRepository.save(existingAdmin);

    if (!updatedAdmin) {
      throw new NotFoundException("Update failed'");
    }
    return {
      message: 'Your profile has been successfully updated!',
      personalDetails: updatedAdmin,
    };
  }

  async deleteProfileById(id: number): Promise<{ message: string }> {
    const admin = await this.electionAdminRepository.findOne({
      where: { id },
      relations: ['profile', 'contacts'],
    });
    if (!admin) {
      throw new NotFoundException("'Admin' not found");
    }

    await this.electionAdminProfileRepository.delete(admin.profile.id);

    for (const contact of admin.contacts) {
      await this.electionAdminContactRepository.delete(contact.id);
    }

    await this.electionAdminRepository.delete(id);

    return { message: "'Your profile has been successfully deleted!" };
  }

  async deleteProfilePicture(fileName: string): Promise<{ message: string }> {
    const profilePicturePath = './uploads/' + fileName;

    if (fs.existsSync(profilePicturePath)) {
      fs.unlinkSync(profilePicturePath);
      return { message: "'Profile picture' has been successfully deleted!" };
    } else {
      throw new NotFoundException("'Profile picture' not found");
    }
  }

  async findElectionAdminByUsername(username: string): Promise<any> {
    const admin = await this.electionAdminRepository.findOne({
      where: { username },
      relations: ['profile', 'contacts'],
    });
    if (!admin) {
      throw new NotFoundException("'Election Admin' not found");
    }

    const { email } = admin;
    const { profile, contacts } = admin;
    const { name } = profile;
    const contact = contacts[0]?.contact;

    return { name, email, contact };
  }

  async addSystemAdmin(
    addDto: CreateSystemAdminDto,
  ): Promise<{ message: string; systemAdmin: SystemAdmin }> {
    const adminProfile = new SystemAdminProfile();
    adminProfile.name = addDto.name;
    adminProfile.address = addDto.address;
    adminProfile.gender = addDto.gender;
    adminProfile.religion = addDto.religion;

    const addedProfile =
      await this.systemAdminProfileRepository.save(adminProfile);

    const adminContact = new SystemAdminContact();
    adminContact.contact = addDto.contact;
    adminContact.admin = addedProfile.admin;
    const savedContact =
      await this.systemAdminContactRepository.save(adminContact);

    const admin = new SystemAdmin();
    admin.username = addDto.username;
    const hashedPassword = await bcrypt.hash(addDto.password, 10);
    admin.password = hashedPassword;
    admin.email = addDto.email;
    admin.nid = addDto.nid;
    admin.profile = addedProfile;
    admin.contacts = [savedContact];

    const addedAdmin = await this.systemAdminRepository.save(admin);

    if (!addedAdmin) {
      throw new NotFoundException('Adding failed');
    }
    return {
      message: "'System Admin' has been successfully added!",
      systemAdmin: addedAdmin,
    };
  }

  async findSystemAdminByUsername(username: string): Promise<any> {
    const admin = await this.systemAdminRepository.findOne({
      where: { username },
      relations: ['profile', 'contacts'],
    });
    if (!admin) {
      throw new NotFoundException("'System Admin' not found");
    }

    const { email, nid } = admin;
    const { profile, contacts } = admin;
    const { name, address, gender, religion } = profile;
    const contact = contacts[0]?.contact;

    return { name, email, nid, address, gender, religion, contact };
  }

  async removeSystemAdminByUsername(
    username: string,
  ): Promise<{ message: string }> {
    const admin = await this.systemAdminRepository.findOne({
      where: { username },
      relations: ['profile', 'contacts'],
    });
    if (!admin) {
      throw new NotFoundException("'System Admin' not found'");
    }

    await this.systemAdminProfileRepository.delete(admin.profile.id);

    if (admin.contacts && admin.contacts.length > 0)
      for (const contact of admin.contacts) {
        await this.systemAdminContactRepository.delete(contact.id);
      }

    await this.systemAdminRepository.delete(admin.id);

    return { message: "'System Admin' has been successfully removed!" };
  }

  async addParty(
    addDto: CreatePartyDto,
  ): Promise<{ message: string; party: Party }> {
    const party = new Party();

    party.partyName = addDto.partyName;
    party.partyLeader = addDto.partyLeader;
    party.partyDescription = addDto.partyDescription;
    party.foundingDate = addDto.foundingDate;
    party.contact = addDto.contact;

    const addedParty = await this.partyRepository.save(party);

    if (!addedParty) {
      throw new NotFoundException('Adding failed');
    }
    return {
      message: "'Party' successfully added!",
      party: addedParty,
    };
  }

  async findPartyByUsername(partyName: string): Promise<Party> {
    return this.partyRepository.findOne({ where: { partyName } });
  }

  async updateParty(
    partyName: string,
    updateDto: UpdatePartyDto,
  ): Promise<{ message: string; party: Party }> {
    const party = await this.partyRepository.findOne({ where: { partyName } });

    if (!party) {
      throw new NotFoundException("'Party' not found");
    }

    party.partyLeader = updateDto.partyLeader;
    party.partyDescription = updateDto.partyDescription;
    party.foundingDate = updateDto.foundingDate;
    party.contact = updateDto.contact;

    const updatedParty = await this.partyRepository.save(party);

    return {
      message: "'Party' has been successfully updated!",
      party: updatedParty,
    };
  }

  async removePartyByPartyName(
    partyName: string,
  ): Promise<{ message: string }> {
    const party = await this.partyRepository.findOne({ where: { partyName } });

    if (!party) {
      throw new NotFoundException("'Party' not found");
    }

    await this.partyRepository.remove(party);

    return {
      message: "'Party' has been successfully removed!",
    };
  }

  async createVotingPoll(
    createDto: CreateVotingPollDto,
  ): Promise<{ message: string; votingPoll: VotingPoll }> {
    const votingPoll = new VotingPoll();

    votingPoll.username = createDto.username;
    votingPoll.candidateName = createDto.candidateName;
    votingPoll.partyName = createDto.partyName;
    votingPoll.voteCount = createDto.voteCount;
    votingPoll.electionLocation = createDto.electionLocation;
    votingPoll.prediction = createDto.prediction;

    const addedVotingPoll = await this.votingPollRepository.save(votingPoll);

    if (!addedVotingPoll) {
      throw new NotFoundException('Adding failed');
    }
    return {
      message: "'Voting Poll' successfully added!",
      votingPoll: addedVotingPoll,
    };
  }

  async reportIssue(
    reportDto: CreateReportIssueDto,
  ): Promise<{ message: string; yourIssue: ReportIssue }> {
    const reportIssue = new ReportIssue();

    reportIssue.username = reportDto.username;
    reportIssue.email = reportDto.email;
    reportIssue.issue = reportDto.issue;

    const reportedIssue = await this.reportRepository.save(reportIssue);

    if (!reportedIssue) {
      throw new NotFoundException("'Report issue' failed!");
    }
    return {
      message: "'Reported issue' successfully!'",
      yourIssue: reportedIssue,
    };
  }

  findAll() {
    return `This action returns all electionAdmin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} electionAdmin`;
  }

  update(id: number, updateElectionAdminDto: UpdateElectionAdminDto) {
    return `This action updates a #${id} electionAdmin`;
  }

  remove(id: number) {
    return `This action removes a #${id} electionAdmin`;
  }
}
