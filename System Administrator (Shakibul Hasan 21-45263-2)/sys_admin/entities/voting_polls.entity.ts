import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Voters } from "./voters.entity";
import { Candidates } from "./candidates.entity";

@Entity("voting_polls")
export class Voting_Polls {
    @PrimaryGeneratedColumn({type: 'bigint'})
    poll_id: number;

    @Column({type: 'varchar', length: 50, nullable: false})
    username: string;

    @Column({type: 'varchar', length: 50, nullable: false})
    candidate_name: string;

    @Column({type: 'bigint', default: 0, unsigned: true})
    vote_count: number;

    @Column({type: 'varchar', length: 150, nullable: false})
    election_location: string;

    @Column({type: 'varchar', length: 20})
    prediction: string;

    @OneToOne(() => Voters, voters => voters.voting_polls)
    voters: Voters;

    @OneToOne(() => Candidates, candidates => candidates.voting_polls)
    candidates: Candidates;
}