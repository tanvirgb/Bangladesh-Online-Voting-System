import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { ElectionAdminService } from '../election-admin.service';
import { ElectionAdmin } from '../entities/election-admin.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly adminService: ElectionAdminService) {
    super();
  }

  async validate(username: string, password: string): Promise<ElectionAdmin> {
    const admin = await this.adminService.findByUsername(username);
    if (admin && (await bcrypt.compare(password, admin.password))) {
      return admin;
    } else throw new UnauthorizedException('Invalid credentials');
  }
}
