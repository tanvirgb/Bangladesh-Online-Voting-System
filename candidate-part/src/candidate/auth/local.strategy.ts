import { Candidate } from './../entities/candidate.entity';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import * as bcrypt from 'bcrypt';
import { CandidateService } from '../candidate.service';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly adminService: CandidateService) {
    super();
  }

  async validate(username: string, password: string): Promise<Candidate> {
    const admin = await this.adminService.findByUsername(username);
    if (admin && (await bcrypt.compare(password, admin.password))) {
      return admin;
    } else throw new UnauthorizedException('Invalid Actions');
  }
}
