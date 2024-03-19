import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  Generated,
  OneToMany,
} from 'typeorm';
import { SystemAdminContact } from './system-admin-contact.entity';
import { SystemAdminProfile } from './system-admin-profile.entity';

@Entity()
export class SystemAdmin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  uniqueId: string;

  @Column({ length: 40, unique: true })
  username: string;

  @Column({ length: 40 })
  password: string;

  @Column({ length: 90, unique: true })
  email: string;

  @Column({ length: 90, unique: true })
  nid: string;

  @OneToOne(() => SystemAdminProfile, (profile) => profile.admin, {
    cascade: true,
  })
  profile: SystemAdminProfile;

  @OneToMany(() => SystemAdminContact, (contact) => contact.admin, {
    cascade: true,
  })
  contacts: SystemAdminContact[];
}
