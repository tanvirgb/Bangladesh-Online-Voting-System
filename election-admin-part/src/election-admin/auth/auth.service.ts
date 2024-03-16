import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ElectionAdmin } from '../entities/election-admin.entity';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  generateToken(payload: ElectionAdmin): string {
    return this.jwtService.sign(payload);
  }
}
