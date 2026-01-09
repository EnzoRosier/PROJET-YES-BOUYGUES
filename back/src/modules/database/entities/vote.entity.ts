import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { WorksiteEntity } from './worksite.entity';

@Entity('vote')
export class VoteEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'numQuestion', type: 'varchar' })
  numQuestion: string;

  @Column({ name: 'reponse', type: 'varchar' })
  reponse: string;

  @Column({ name: 'commentaire', type: 'varchar', nullable:true })
  commentaire: string;

  @Column({ name: 'reponseCommentaire', type: 'varchar', nullable: true })
  reponseCommentaire: string;

  @Column({ name: 'date', type: 'date' })
  date: Date;

  @Column({ name: 'dateCloture', type: 'date', nullable: true })
  dateCloture: Date;

  @ManyToOne(() => WorksiteEntity, (worksite) => worksite.votes)
  worksite: WorksiteEntity;
}
