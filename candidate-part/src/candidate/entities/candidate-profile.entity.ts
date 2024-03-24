import { Candidate } from './candidate.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  Generated,
  JoinColumn,
} from 'typeorm';


@Entity()
export class CandidateProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  uniqueId: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 200 })
  address: string;

  @Column({ length: 70 })
  email: string;

  @Column({ length: 30 })
  gender: string;

  @Column({ length: 30 })
  religion: string;

  @OneToOne(() => Candidate, (candidate) => candidate.profile)
  @JoinColumn()
  candidate: CandidateProfile;
  admin: Candidate;
}
