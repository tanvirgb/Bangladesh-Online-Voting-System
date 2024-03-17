import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Generated,
} from 'typeorm';
import { Party } from './party.entity';

@Entity()
export class PartyContact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  uniqueId: string;

  @Column({ length: 25 })
  contact: string;

  @ManyToOne(() => Party, (party) => party.contacts)
  party: Party;
}
