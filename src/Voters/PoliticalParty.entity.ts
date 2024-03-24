import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany, ManyToOne, PrimaryColumn, Unique } from "typeorm";
import { CandidatesEntity } from "./Candidates.entity";

@Entity("poltical_party")
export class PoliticalPartyEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100, unique: true }) 
    name: string;

    @Column({ length: 100 }) 
    founding_date: string;

    @Column({ length: 100 }) 
    description: string;

    @Column({ length: 100 }) 
    leader: string;

    // One-to-One relationship with VotersEntity
    @OneToMany(() => CandidatesEntity, candidate => candidate.party, { cascade: true })
    candidate: CandidatesEntity[];
}
