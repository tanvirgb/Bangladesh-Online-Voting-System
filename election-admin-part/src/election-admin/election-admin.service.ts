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
  ) {}

  async createElectionAdmin(
    registrationDto: CreateElectionAdminDto,
  ): Promise<{ message: string; yourProfile: ElectionAdmin }> {
    const adminProfile = new ElectionAdminProfile();
    adminProfile.name = registrationDto.name;
    adminProfile.address = registrationDto.address;
    adminProfile.email = registrationDto.email;
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

  async findByUsername(username: string): Promise<ElectionAdmin | undefined> {
    return await this.adminRepository.findOne({ where: { username } });
  }

  async getAdminProfileByUsername(username: string): Promise<any> {
    const admin = await this.adminRepository.findOne({
      where: { username },
      relations: ['profile', 'contacts'],
    });
    if (!admin) {
      throw new NotFoundException('Admin not found');
    }

    const { profile, contacts } = admin;
    const { name, email } = profile;
    const contact = contacts[0]?.contact;

    return { name, email, contact };
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
      throw new NotFoundException('Registration failed');
    }
    return {
      message: 'Update successful!',
      personalDetails: updatedAdmin,
    };
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
      message: 'Adding successful!',
      party: addedParty,
    };
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
      message: 'Update successful!',
      party: updatedParty,
    };
  }

  async findPartyByUsername(partyName: string): Promise<Party> {
    return this.partyRepository.findOne({ where: { partyName } });
  }

  async deletePartyByName(partyName: string): Promise<{ message: string }> {
    const party = await this.partyRepository.findOne({ where: { partyName } });

    if (!party) {
      throw new NotFoundException('Party not found');
    }

    await this.partyRepository.remove(party);

    return {
      message: 'Delete successful!',
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
