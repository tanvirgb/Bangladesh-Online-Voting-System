import { Column, Entity, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";
import { Voters } from "./voters.entity";
import { Sys_Admin } from "./sys_admin.entity";

@Entity("centers")
export class Centers {
    @PrimaryColumn({type: 'bigint', unique: true, nullable: false})
    center_id: number;

    @Column({type: 'varchar', length: 50, nullable: false})
    center_name: string;

    @Column({type: 'varchar', length: 15, nullable: false})
    emergency_contact: string;

    @Column({type: 'varchar', length: 150, nullable: false})
    election_location: string;

    @OneToOne(() => Voters, voters => voters.centers)
    voters: Voters;

    @ManyToOne(() => Sys_Admin, sys_admin => sys_admin.centers)
    sys_admin: Sys_Admin;
}