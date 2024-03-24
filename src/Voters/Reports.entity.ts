import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany, ManyToOne, PrimaryColumn, Unique } from "typeorm";
import { VotersEntity } from "./Voters.entity";

@Entity("reports")
export class ReportsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 }) 
    issue: string;

    @Column({ length: 100 , nullable: true }) 
    user: string;

    // Many-to-One relationship with VotersEntity
    @ManyToOne(() => VotersEntity, voter => voter.reports)
    voter: VotersEntity;
    

}