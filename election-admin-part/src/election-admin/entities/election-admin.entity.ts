import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  Generated,
} from 'typeorm';
import { ElectionAdminProfile } from './election-admin-profile.entity';

@Entity()
export class ElectionAdmin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  uniqueId: string;

  @Column({ default: 'username', length: 70, unique: true })
  username: string;

  @Column({ default: 'password', length: 70 })
  password: string;

  @Column({ default: 0, unique: true })
  nid: number;

  @OneToOne(
    () => ElectionAdminProfile,
    (electionAdminProfile) => electionAdminProfile.electionAdmin,
    {
      cascade: true,
    },
  )
  @JoinColumn()
  electionAdminProfile: ElectionAdminProfile;
}
