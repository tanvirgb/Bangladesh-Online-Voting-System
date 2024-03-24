import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany, ManyToOne, PrimaryColumn, Unique, ManyToMany } from "typeorm";
import { CandidatesEntity } from "./Candidates.entity";
import { VotersEntity } from "./Voters.entity";
@Entity("voting_poll")
export class VotingPollEntity {
    @PrimaryColumn()
    id: number;

    @Column({ length: 100 }) 
    username: string;

    @Column({ unsigned: true }) 
    vote_count: number;

    @Column({ length: 100 }) 
    location: string;

    @Column({ unsigned: true , default: 45 }) 
    prediction: number;

    // Many-to-Many relationship with CandidatesEntity
    @ManyToMany(() => CandidatesEntity, candidate => candidate.votingPoll)
    candidate: CandidatesEntity[];

    // One-to-Many relationship with VotersEntity
    @OneToMany(() => VotersEntity, voter => voter.username)
    voter: VotersEntity[];
}