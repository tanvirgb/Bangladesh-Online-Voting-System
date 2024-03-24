import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    Generated,
    OneToMany,
  } from 'typeorm';
import { CandidateContact } from './candidate-contact.entity';
import { CandidateProfile } from './candidate-profile.entity';

  
  @Entity()
  export class Candidate {
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
  
    @OneToOne(() => CandidateProfile, (profile) => profile.candidate, {
      cascade: true,
    })
    profile: CandidateProfile;
  
    @OneToMany(() =>CandidateContact, (contact) => contact.candidate, {
      cascade: true,
    })
    contacts: CandidateContact[];
  }

export { CandidateProfile };
  