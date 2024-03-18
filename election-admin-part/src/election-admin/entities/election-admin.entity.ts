import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  Generated,
  OneToMany,
} from 'typeorm';
import { ElectionAdminProfile } from './election-admin-profile.entity';
import { ElectionAdminContact } from './election-admin-contact.entity';

@Entity()
export class ElectionAdmin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  uniqueId: string;

  @Column({ length: 70, unique: true })
  username: string;

  @Column({ length: 70 })
  password: string;

  @Column({ length: 70, unique: true })
  nid: string;

  @OneToOne(() => ElectionAdminProfile, (profile) => profile.admin, {
    cascade: true,
  })
  profile: ElectionAdminProfile;

  @OneToMany(() => ElectionAdminContact, (contact) => contact.admin, {
    cascade: true,
  })
  contacts: ElectionAdminContact[];
}
