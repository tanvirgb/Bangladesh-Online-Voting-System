import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { Reports } from "./reports.entity";
import { Voting_Polls } from "./voting_polls.entity";
import { Centers } from "./centers.entity";

@Entity("voters")
export class Voters {
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

    @Column({type: 'boolean', default: false})
    voted: boolean;

    @Column({type: 'boolean', default: false})
    select_offline_vote: boolean;

    @Column({ type: 'bytea' })
    image: Buffer;

    @OneToMany(() => Reports, reports => reports.voters, { cascade: true })
    reports: Reports[];

    @OneToOne(() => Voting_Polls, voting_polls => voting_polls.voters, { cascade: true })
    @JoinColumn()
    voting_polls: Voting_Polls;

    @OneToOne(() => Centers, centers => centers.voters, { cascade: true })
    @JoinColumn()
    centers: Centers;
}