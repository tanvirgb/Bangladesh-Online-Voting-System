import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Candidates } from "./candidates.entity";

@Entity("political_parties")
export class Political_Parties {
    @PrimaryGeneratedColumn({type: 'bigint'})
    party_id: number;

    @Column({type: 'varchar', length: 50, nullable: false})
    party_name: string;

    @Column({type: 'varchar', length: 50, nullable: false})
    founding_date: string;

    @Column({type: 'varchar', length: 2000, nullable: false})
    party_description: string;

    @Column({type: 'varchar', length: 50, nullable: false})
    party_leader: string;

    @OneToOne(() => Candidates, candidates => candidates.political_parties)
    candidates: Candidates;
}