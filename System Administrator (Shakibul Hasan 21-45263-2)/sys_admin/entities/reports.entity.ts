import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Sys_Admin } from "./sys_admin.entity";
import { Voters } from "./voters.entity";
import { Election_Admin } from "./election_admin.entity";
import { Candidates } from "./candidates.entity";

@Entity("reports")
export class Reports {
    @PrimaryGeneratedColumn({type: 'bigint'})
    report_id: number;

    @Column({type: 'varchar', length: 50, nullable: false})
    username: string;

    @Column({type: 'varchar', length: 1000, nullable: false})
    issue: string;

    @ManyToOne(() => Election_Admin, election_admin => election_admin.reports)
    election_admin: Election_Admin;

    @ManyToOne(() => Voters, voters => voters.reports)
    voters: Voters;

    @ManyToOne(() => Candidates, candidates => candidates.reports)
    candidates: Candidates;

    @ManyToOne(() => Sys_Admin, sys_admin => sys_admin.reports)
    sys_admin: Sys_Admin;
}