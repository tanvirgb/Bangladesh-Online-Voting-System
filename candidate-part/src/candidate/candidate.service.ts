import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateReportIssueDto } from './dto/create-report-issue.dto';
import { ReportIssue } from './entities/report.entity';
import { updateCandidateDto } from './dto/update-candidate.dto';
import { CandidateContact } from './entities/candidate-contact.entity';
import { CandidateProfile } from './entities/candidate-profile.entity';
import { Candidate } from './entities/candidate.entity';
import { CreateCandidateDto } from './dto/create-candidate.dto';

@Injectable()
export class CandidateService {
  constructor(
    @InjectRepository(Candidate)
    private readonly adminRepository: Repository<Candidate>,
    @InjectRepository(CandidateProfile)
    private readonly profileRepository: Repository<CandidateProfile>,
    @InjectRepository(CandidateContact)
    private readonly contactRepository: Repository<CandidateContact>,
    private readonly jwtService: JwtService,
    @InjectRepository(ReportIssue)
    private readonly reportRepository: Repository<ReportIssue>,
  ) {}

  async findByUsername(username: string): Promise<Candidate | undefined> {
    return await this.adminRepository.findOne({ where: { username } });
  }

  async createCandidate(
    registrationDto: CreateCandidateDto,
  ): Promise<{ message: string; yourProfile: Candidate }> {
    const candidateProfile = new CandidateProfile();
    candidateProfile.name = registrationDto.name;
    candidateProfile.address = registrationDto.address;
    candidateProfile.email = registrationDto.email;
    candidateProfile.gender = registrationDto.gender;
    candidateProfile.religion = registrationDto.religion;

    const savedProfile = await this.profileRepository.save(candidateProfile);

    const candidateContact = new CandidateContact();
    candidateContact.contact = registrationDto.contact;
    candidateContact.candidate = savedProfile.admin;
    const savedContact = await this.contactRepository.save(candidateContact);

    const admin = new Candidate();
    admin.username = registrationDto.username;
    const hashedPassword = await bcrypt.hash(registrationDto.password, 10);

    admin.password = hashedPassword;
    admin.nid = registrationDto.nid;
    admin.profile = savedProfile;
    admin.contacts = [savedContact];

    const savedAdmin = await this.adminRepository.save(admin);

    if (!savedAdmin) {
      throw new NotFoundException('Registration failed!');
    }
    return {
      message: 'Registration Was successful!',
      yourProfile: savedAdmin,
    };
  }

  async getOwnProfileById(id: number): Promise<Candidate> {
    return this.adminRepository.findOne({
      where: { id },
      relations: ['profile', 'contacts'],
    });
  }

  async updateCandidate(
    id: number,
    updateDto: updateCandidateDto,
  ): Promise<{ message: string; personalDetails: Candidate }> {
    const existingAdmin = await this.adminRepository.findOne({
      where: { id },
      relations: ['profile'],
    });
    
    if (!existingAdmin) {
      throw new NotFoundException('Candidate not Exist ');
    }

    existingAdmin.username = updateDto.username;
    existingAdmin.nid = updateDto.nid;

    const hashedPassword = await bcrypt.hash(updateDto.password, 10);

    existingAdmin.password = hashedPassword;

    existingAdmin.profile.name = updateDto.name;
    existingAdmin.profile.address = updateDto.address;
    existingAdmin.profile.email = updateDto.email;
    existingAdmin.profile.gender = updateDto.gender;
    existingAdmin.profile.religion = updateDto.religion;

    const updatedAdmin = await this.adminRepository.save(existingAdmin);

    if (!updatedAdmin) {
      throw new NotFoundException('Update operation  failed');
    }
    return {
      message: 'profile has been successfully updated!',
      personalDetails: updatedAdmin,
    };
  }

  async deleteProfileById(id: number): Promise<{ message: string }> {
    const admin = await this.adminRepository.findOne({
      where: { id },
      relations: ['profile', 'contacts'],
    });
    if (!admin) {
      throw new NotFoundException('Candidate Not Exist');
    }

    await this.profileRepository.delete(admin.profile.id);

    for (const contact of admin.contacts) {
      await this.contactRepository.delete(contact.id);
    }

    await this.adminRepository.delete(id);

    return { message: 'Candidate Profile Has Been Successfully Deleted!' };
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
      throw new NotFoundException('Reported Issue Failed! There Is A  Problem !');
    }
    return {
      message: 'Your Issue  Has Been Submitted Successfully!',
      yourIssue: reportedIssue,
    };
  }

  findAll() {
    return `This Action Will Return All Candidate`;
  }

  findOne(id: number) {
    return `This Action Will Returns A Specific This #${id} Candidate`;
  }

  update(id: number, updateCandidateDto: updateCandidateDto) {
    return `This  Action Will Updates A Specific This #${id} Candidate`;
  }

  remove(id: number) {
    return `This Action Will Removes A Specific This #${id} Candidate`;
  }
}
