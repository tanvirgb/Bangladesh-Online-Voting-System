import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Generated,
} from 'typeorm';
import { ElectionAdmin } from './election-admin.entity';

@Entity()
export class ElectionAdminContact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  uniqueId: string;

  @Column({ length: 25 })
  contact: string;

  @ManyToOne(() => ElectionAdmin, (admin) => admin.contacts, {
    
  })
  admin: ElectionAdmin;
}
