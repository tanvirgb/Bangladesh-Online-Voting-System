import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn} from "typeorm";
import { Sys_Admin } from "./sys_admin.entity";
import { Reports } from "./reports.entity";

@Entity("election_admin")
export class Election_Admin {
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

    @Column({ type: 'bytea' })
    image: Buffer;

    @ManyToMany(() => Sys_Admin, sys_admin => sys_admin.election_admin)
    @JoinTable()
    sys_admin: Sys_Admin[];

    @OneToMany(() => Reports, reports => reports.election_admin, { cascade: true })
    reports: Reports[];
}