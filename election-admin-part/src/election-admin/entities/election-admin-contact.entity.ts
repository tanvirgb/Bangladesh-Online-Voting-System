import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Generated,
} from 'typeorm';
import { ElectionAdminProfile } from './election-admin-profile.entity';

@Entity()
export class ElectionAdminContact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  uniqueId: string;

  @Column({ default: 'contact', length: 25 })
  contact: string;

  @ManyToOne(
    () => ElectionAdminProfile,
    (electionAdminProfile) => electionAdminProfile.electionAdminContacts,
  )
  electionAdminProfile: ElectionAdminProfile;
}
