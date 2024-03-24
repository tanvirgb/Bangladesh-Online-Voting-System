import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany, ManyToOne, PrimaryColumn, Unique, JoinTable } from "typeorm";
import { ReportsEntity } from "./Reports.entity";
import { VotingPollEntity } from "./VotingPoll.entity";
import { CentersEntity } from "./Centers.entity";

@Entity("voter")
export class VotersEntity {
   
    @Column({ unique: true }) 
    nid: number;

    @PrimaryColumn({ length: 100, unique: true }) 
    username: string;

    @Column({ length: 100 }) 
    password: string;

    @Column({ length: 100 }) 
    name: string;

    @Column({ length: 100 }) 
    address: string;

    @Column({ unsigned: true }) 
    contact: number;

    @Column({ length: 100 }) 
    email: string;

    @Column({ enum: ['male', 'female']}) 
    gender: string;

    @Column({ length: 100 }) 
    religion: string;

    @Column({  default: 'no', enum: ['yes', 'no'],nullable: true}) 
    voted: boolean;

    @Column({ default: false,nullable: true })
    select_offline_vote: boolean;

    @Column({ type: 'bytea'})
    image: Buffer;

    // One-to-Many relationship with ReportsEntity
    @OneToMany(() => ReportsEntity, reports => reports.voter)
    reports: ReportsEntity[];
    // Many-to-One relationship with VotingPollEntity
    @ManyToOne(() => VotingPollEntity, votingPoll => votingPoll.username)
    votingPoll: VotingPollEntity;
    // One-to-One relationship with CentersEntity
    @OneToOne(() => CentersEntity, voter => voter.center, { cascade: true
    })
    @JoinColumn()
    voter: CentersEntity;

}

