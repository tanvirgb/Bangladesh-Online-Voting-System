import { Entity, Column, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ReportIssue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  uniqueId: string;

  @Column({ length: 70 })
  username: string;

  @Column({ length: 70 })
  email: string;

  @Column({ length: 1000 })
  issue: string;
}
