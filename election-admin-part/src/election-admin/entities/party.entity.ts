import { Entity, PrimaryGeneratedColumn, Column, Generated } from 'typeorm';

@Entity()
export class Party {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  uniqueId: string;

  @Column({ default: 'partyName', length: 200 })
  partyName: string;

  @Column({ default: 'foundingDate', length: 70 })
  foundingDate: string;

  @Column({ default: 'partyDescription', length: 1000 })
  partyDescription: string;

  @Column({ default: 'partyLeader', length: 150 })
  partyLeader: string;
}
