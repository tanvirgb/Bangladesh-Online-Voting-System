import { Entity, Column, PrimaryGeneratedColumn, Generated } from 'typeorm';

@Entity()
export class VotingPoll {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  uniqueId: string;

  @Column({ length: 40, unique: true })
  username: string;

  @Column({ length: 150 })
  candidateName: string;

  @Column({ length: 200, unique: true })
  partyName: string;

  @Column({ default: 100 })
  voteCount: string;

  @Column({ length: 250 })
  electionLocation: string;

  @Column({ length: 50 })
  prediction: string;
}
