import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { Voting_Polls } from "./voting_polls.entity";
import { Reports } from "./reports.entity";
import { Candidate_Delete_Request } from "./candidate_delete_request.entity";
import { Political_Parties } from "./political_parties.entity";

@Entity("candidates")
export class Candidates {
    @PrimaryColumn({type: 'varchar', length: 50, unique: true, nullable: false})
    username: string;

    @Column({type: 'varchar', length: 200, nullable: false})
    password: string;

    @Column({type: 'bigint', unique: true, nullable: false, unsigned: true})
    nid: number;

    @Column({type: 'varchar', length: 50, nullable: false})
    name: string;

    @Column({type: 'varchar', length: 150, nullable: false})
    address: string;

    @Column({type: 'varchar', length: 15, nullable: false})
    contact: string;

    @Column({type: 'varchar', length: 50, nullable: false})
    email: string;

    @Column({type: 'varchar', length: 10, nullable: false})
    gender: string;

    @Column({type: 'varchar', length: 20, nullable: false})
    religion: string;

    @Column({type: 'varchar', length: 50, nullable: false})
    party_name: string;

    @Column({type: 'varchar', length: 20, nullable: false})
    position: string;

    @Column({type: 'varchar', length: 50, nullable: false})
    election_location: string;

    @Column({type: 'boolean', default: false})
    voted: boolean;

    @Column({type: 'boolean', default: false})
    select_offline_vote: boolean;

    @Column({type: 'boolean', default: false})
    account_grant: boolean;

    @Column({ type: 'bytea' })
    image: Buffer;

    @OneToOne(() => Voting_Polls, voting_polls => voting_polls.candidates, { cascade: true })
    @JoinColumn()
    voting_polls: Voting_Polls;

    @OneToMany(() => Reports, reports => reports.candidates, { cascade: true })
    reports: Reports[];

    @OneToOne(() => Candidate_Delete_Request, candidate_delete_request => candidate_delete_request.candidates, { cascade: true })
    @JoinColumn()
    candidate_delete_request: Candidate_Delete_Request;

    @OneToOne(() => Political_Parties, political_parties => political_parties.candidates, { cascade: true })
    @JoinColumn()
    political_parties: Political_Parties;
}