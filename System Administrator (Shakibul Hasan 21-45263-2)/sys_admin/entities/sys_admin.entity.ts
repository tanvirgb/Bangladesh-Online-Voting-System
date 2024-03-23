import { Column, Entity, ManyToMany, OneToMany, PrimaryColumn } from "typeorm";
import { Reports } from "./reports.entity";
import { Election_Admin } from "./election_admin.entity";
import { Candidate_Delete_Request } from "./candidate_delete_request.entity";
import { Centers } from "./centers.entity";

@Entity("sys_admin")
export class Sys_Admin {
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

    @Column({type: 'bytea'})
    image: Buffer;

    @ManyToMany(() => Election_Admin, election_admin => election_admin.sys_admin)
    election_admin: Election_Admin[];

    @OneToMany(() => Candidate_Delete_Request,  candidate_delete_request => candidate_delete_request.sys_admin, { cascade: true })
    candidate_delete_request: Candidate_Delete_Request[];

    @OneToMany(() => Centers,  centers => centers.sys_admin, { cascade: true })
    centers: Centers[];

    @OneToMany(() => Reports,  reports => reports.sys_admin, { cascade: true })
    reports: Reports[];
}