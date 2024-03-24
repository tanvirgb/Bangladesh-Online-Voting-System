import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany, ManyToOne, PrimaryColumn, Unique, ManyToMany, JoinTable } from "typeorm";
import { VotingPollEntity } from "./VotingPoll.entity";
import { PoliticalPartyEntity } from "./PoliticalParty.entity";

@Entity("candidates")
export class CandidatesEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 }) 
    name: string;

    @Column({ length: 100 }) 
    address: string;

    @Column({ unsigned: true }) 
    contact: number;

    @Column({ length: 100 }) 
    email: string;

    @Column() 
    gender: string;

    @Column({ length: 100 }) 
    religion: string;

    @Column({ length: 100 }) 
    party_name: string;

    @Column({ length: 100 }) 
    position: string;

    @Column({ length: 100 }) 
    election_location: string;

    // Many-to-Many relationship with VotingPollEntity
    @ManyToMany(() => VotingPollEntity, votingPoll => votingPoll.candidate)
    @JoinTable()
    votingPoll: VotingPollEntity[];

    // One-to-One relationship with VotersEntity
    @ManyToOne(() => PoliticalPartyEntity, party => party.candidate)
    party: PoliticalPartyEntity;

}