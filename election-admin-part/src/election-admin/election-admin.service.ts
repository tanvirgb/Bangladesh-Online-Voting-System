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
  ) {}

  async createElectionAdmin(
    registrationDto: CreateElectionAdminDto,
  ): Promise<{ message: string; newElectionAdmin: ElectionAdmin }> {
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
      newElectionAdmin: savedAdmin,
    };
  }

  async findByUsername(username: string): Promise<ElectionAdmin | undefined> {
    return await this.adminRepository.findOne({ where: { username } });
  }

  async getAdminProfile(id: number): Promise<any> {
    const admin = await this.adminRepository.findOne({
      where: { id },
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
