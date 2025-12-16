import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { WorksiteEntity } from './worksite.entity';

@Entity('vote')
export class VoteEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'numQuestion', type: 'varchar' })
  numQuestion: string;

  @Column({ name: 'reponse', type: 'varchar' })
  reponse: string;

  @Column({ name: 'commentaire', type: 'varchar' })
  commentaire: string;

  @Column({ name: 'date', type: 'date' })
  date: Date;

  @ManyToOne(() => WorksiteEntity, (worksite) => worksite.votes)
  worksite: WorksiteEntity;
}
