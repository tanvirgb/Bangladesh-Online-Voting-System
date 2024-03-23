import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Candidates } from "./candidates.entity";
import { Sys_Admin } from "./sys_admin.entity";

@Entity("candidate_delete_request")
export class Candidate_Delete_Request {
    @PrimaryGeneratedColumn({type: 'bigint'})
    request_id: number;

    @Column({type: 'varchar', length: 50, nullable: false})
    username: string;

    @Column({type: 'varchar', length: 1000, nullable: false})
    issue: string;

    @OneToOne(() => Candidates, candidates => candidates.candidate_delete_request)
    candidates: Candidates;

    @ManyToOne(() => Sys_Admin, sys_admin => sys_admin.candidate_delete_request)
    sys_admin: Sys_Admin;
}