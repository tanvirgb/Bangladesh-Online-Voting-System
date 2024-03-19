import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  Generated,
  JoinColumn,
} from 'typeorm';
import { ElectionAdmin } from './election-admin.entity';

@Entity()
export class ElectionAdminProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  uniqueId: string;

  @Column({ length: 150 })
  name: string;

  @Column({ length: 250 })
  address: string;

  @Column({ length: 30 })
  gender: string;

  @Column({ length: 30 })
  religion: string;

  @OneToOne(() => ElectionAdmin, (admin) => admin.profile)
  @JoinColumn()
  admin: ElectionAdmin;
}
