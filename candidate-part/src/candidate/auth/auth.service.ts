import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CandidateProfile } from '../entities/candidate.entity';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  generateToken(payload: CandidateProfile): string {
    return this.jwtService.sign(payload);
  }
  
}
