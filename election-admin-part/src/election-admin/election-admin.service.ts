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

@Injectable()
export class ElectionAdminService {
  constructor(
    @InjectRepository(ElectionAdmin)
    private readonly adminRepository: Repository<ElectionAdmin>,
    @InjectRepository(ElectionAdminProfile)
    private readonly profileRepository: Repository<ElectionAdminProfile>,
    @InjectRepository(ElectionAdminContact)
    private readonly contactRepository: Repository<ElectionAdminContact>,
    private readonly jwtService: JwtService,
    @InjectRepository(Party)
    private readonly partyRepository: Repository<Party>,
    @InjectRepository(ReportIssue)
    private readonly reportRepository: Repository<ReportIssue>,
  ) {}

  async findByUsername(username: string): Promise<ElectionAdmin | undefined> {
    return await this.adminRepository.findOne({ where: { username } });
  }

  async changePassword(
    email: string,
    changeDto: CreateElectionAdminDto,
  ): Promise<{ message: string }> {
    const existingAdmin = await this.adminRepository.findOne({
      where: { email },
    });
    if (!existingAdmin) {
      throw new NotFoundException('Email not found');
    }

    const hashedPassword = await bcrypt.hash(changeDto.password, 10);
    existingAdmin.password = hashedPassword;

    const changedPassword = await this.adminRepository.save(existingAdmin);

    if (!changedPassword) {
      throw new NotFoundException('Password reset failed');
    }

    return { message: 'Your password has been changed!' };
  }

  async createElectionAdmin(
    registrationDto: CreateElectionAdminDto,
  ): Promise<{ message: string; yourProfile: ElectionAdmin }> {
    const adminProfile = new ElectionAdminProfile();
    adminProfile.name = registrationDto.name;
    adminProfile.address = registrationDto.address;
    adminProfile.gender = registrationDto.gender;
    adminProfile.religion = registrationDto.religion;

    const savedProfile = await this.profileRepository.save(adminProfile);

    const adminContact = new ElectionAdminContact();
    adminContact.contact = registrationDto.contact;
    adminContact.admin = savedProfile.admin;
    const savedContact = await this.contactRepository.save(adminContact);

    const admin = new ElectionAdmin();
    admin.username = registrationDto.username;
    const hashedPassword = await bcrypt.hash(registrationDto.password, 10);
    admin.password = hashedPassword;
    admin.email = registrationDto.email;
    admin.nid = registrationDto.nid;
    admin.profile = savedProfile;
    admin.contacts = [savedContact];

    const savedAdmin = await this.adminRepository.save(admin);

    if (!savedAdmin) {
      throw new NotFoundException('Registration failed');
    }
    return {
      message: 'Registration successful!',
      yourProfile: savedAdmin,
    };
  }

  async getOwnProfileById(id: number): Promise<ElectionAdmin> {
    return this.adminRepository.findOne({
      where: { id },
      relations: ['profile', 'contacts'],
    });
  }

  async updateElectionAdmin(
    id: number,
    updateDto: UpdateElectionAdminDto,
  ): Promise<{ message: string; personalDetails: ElectionAdmin }> {
    const existingAdmin = await this.adminRepository.findOne({
      where: { id },
      relations: ['profile'],
    });
    if (!existingAdmin) {
      throw new NotFoundException('Admin not found');
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

    const updatedAdmin = await this.adminRepository.save(existingAdmin);

    if (!updatedAdmin) {
      throw new NotFoundException('Update failed');
    }
    return {
      message: 'Your profile has been successfully updated!',
      personalDetails: updatedAdmin,
    };
  }

  async deleteProfileById(id: number): Promise<{ message: string }> {
    const admin = await this.adminRepository.findOne({
      where: { id },
      relations: ['profile', 'contacts'],
    });
    if (!admin) {
      throw new NotFoundException('Admin not found');
    }

    await this.profileRepository.delete(admin.profile.id);

    for (const contact of admin.contacts) {
      await this.contactRepository.delete(contact.id);
    }

    await this.adminRepository.delete(id);

    return { message: 'Your profile has been successfully deleted!' };
  }

  async deleteProfilePicture(fileName: string): Promise<{ message: string }> {
    const profilePicturePath = './uploads/' + fileName;

    if (fs.existsSync(profilePicturePath)) {
      fs.unlinkSync(profilePicturePath);
      return { message: 'Profile picture has been deleted successfully!' };
    } else {
      throw new NotFoundException('Profile picture not found');
    }
  }

  async getAdminProfileByUsername(username: string): Promise<any> {
    const admin = await this.adminRepository.findOne({
      where: { username },
      relations: ['profile', 'contacts'],
    });
    if (!admin) {
      throw new NotFoundException('Admin not found');
    }

    const { email } = admin;
    const { profile, contacts } = admin;
    const { name } = profile;
    const contact = contacts[0]?.contact;

    return { name, email, contact };
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
      message: 'Party successfully added!',
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
      throw new NotFoundException('Party not found');
    }

    party.partyLeader = updateDto.partyLeader;
    party.partyDescription = updateDto.partyDescription;
    party.foundingDate = updateDto.foundingDate;
    party.contact = updateDto.contact;

    const updatedParty = await this.partyRepository.save(party);

    return {
      message: 'Party successfully updated!',
      party: updatedParty,
    };
  }

  async removePartyByName(partyName: string): Promise<{ message: string }> {
    const party = await this.partyRepository.findOne({ where: { partyName } });

    if (!party) {
      throw new NotFoundException('Party not found');
    }

    await this.partyRepository.remove(party);

    return {
      message: 'Party successfully deleted!',
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
      throw new NotFoundException('Report issue failed!');
    }
    return {
      message: 'Reported issue successfully!',
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
