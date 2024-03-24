import { Candidate } from './candidate.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Generated,
} from 'typeorm';

@Entity()
export class CandidateContact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  uniqueId: string;

  @Column({ length: 25 })
  contact: string;

  @ManyToOne(() => Candidate, (candidate) => candidate.contacts)
  candidate: Candidate;
}
