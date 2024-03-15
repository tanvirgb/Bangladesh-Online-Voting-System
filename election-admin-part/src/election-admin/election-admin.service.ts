import { Injectable } from '@nestjs/common';
import { CreateElectionAdminDto } from './dto/create-election-admin.dto';
import { UpdateElectionAdminDto } from './dto/update-election-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ElectionAdminContact } from './entities/election-admin-contact.entity';
import { ElectionAdminProfile } from './entities/election-admin-profile.entity';
import { Repository } from 'typeorm';
import { ElectionAdmin } from './entities/election-admin.entity';

@Injectable()
export class ElectionAdminService {
  constructor(
    @InjectRepository(ElectionAdmin)
    private readonly adminRepository: Repository<ElectionAdmin>,
    @InjectRepository(ElectionAdminProfile)
    private readonly profileRepository: Repository<ElectionAdminProfile>,
    @InjectRepository(ElectionAdminContact)
    private readonly contactRepository: Repository<ElectionAdminContact>,
  ) {}

  async createElectionAdmin(
    createElectionAdminDto: CreateElectionAdminDto,
  ): Promise<ElectionAdmin> {
    const adminProfile = new ElectionAdminProfile();
    adminProfile.name = createElectionAdminDto.name;
    adminProfile.address = createElectionAdminDto.address;
    adminProfile.email = createElectionAdminDto.email;
    adminProfile.gender = createElectionAdminDto.gender;
    adminProfile.religion = createElectionAdminDto.religion;

    const savedProfile = await this.profileRepository.save(adminProfile);

    const adminContact = new ElectionAdminContact();
    adminContact.contact = createElectionAdminDto.contact;
    adminContact.admin = savedProfile.admin;
    const savedContact = await this.contactRepository.save(adminContact);

    const admin = new ElectionAdmin();
    admin.username = createElectionAdminDto.username;
    admin.password = createElectionAdminDto.password;
    admin.nid = createElectionAdminDto.nid;
    admin.profile = savedProfile;
    admin.contacts = [savedContact];

    return await this.adminRepository.save(admin);
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
