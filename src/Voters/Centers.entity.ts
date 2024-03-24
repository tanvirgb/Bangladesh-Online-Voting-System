import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany, ManyToOne, PrimaryColumn, Unique } from "typeorm";
import { VotersEntity } from "./Voters.entity";

@Entity("centers")
export class CentersEntity {
    @Column({ length: 100 }) // setting maximum length for varchar
    name: string;

    @PrimaryGeneratedColumn() // setting maximum length for varchar
    id: number;

    @Column({ unsigned: true }) // setting unsigned for contact
    contact: number;

    @Column({ length: 300 }) // setting maximum length for varchar
    location: string;

    @OneToOne(() => VotersEntity, center => center.voter)
    center: VotersEntity;


}