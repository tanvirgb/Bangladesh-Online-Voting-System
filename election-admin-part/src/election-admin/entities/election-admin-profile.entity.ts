import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  Generated,
} from 'typeorm';
import { ElectionAdmin } from './election-admin.entity';
import { ElectionAdminContact } from './election-admin-contact.entity';
@Entity()
export class ElectionAdminProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  uniqueId: string;

  @Column({ default: 'name', length: 150 })
  name: string;

  @Column({ default: 'address', length: 250 })
  address: string;

  @Column({ default: 'email', length: 70 })
  email: string;

  @Column({ default: 'gender', length: 30 })
  gender: string;

  @Column({ default: 'religion', length: 30 })
  religion: string;

  @OneToOne(
    () => ElectionAdmin,
    (electionAdmin) => electionAdmin.electionAdminProfile,
  )
  electionAdmin: ElectionAdmin;

  @OneToMany(
    () => ElectionAdminContact,
    (electionAdminContact) => electionAdminContact.electionAdminProfile,
    { cascade: true },
  )
  electionAdminContacts: ElectionAdminContact[];
}
