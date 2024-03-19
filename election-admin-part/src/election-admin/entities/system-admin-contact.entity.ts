import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Generated,
} from 'typeorm';
import { SystemAdmin } from './system-admin.entity';

@Entity()
export class SystemAdminContact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  uniqueId: string;

  @Column({ length: 25 })
  contact: string;

  @ManyToOne(() => SystemAdmin, (admin) => admin.contacts)
  admin: SystemAdmin;
}
