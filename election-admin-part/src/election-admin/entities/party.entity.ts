import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Generated,
  OneToMany,
} from 'typeorm';
import { PartyContact } from './party-contact.entity';

@Entity()
export class Party {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  uniqueId: string;

  @Column({ length: 200 })
  partyName: string;

  @Column({ length: 150 })
  partyLeader: string;

  @Column({ length: 1000 })
  partyDescription: string;

  @Column({ length: 70 })
  foundingDate: string;

  @OneToMany(() => PartyContact, (contact) => contact.party, {
    cascade: true,
  })
  contacts: PartyContact[];
}
