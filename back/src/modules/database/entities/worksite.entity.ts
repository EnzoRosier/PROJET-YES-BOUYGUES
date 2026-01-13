import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AdminEntity } from './admin.entity';
import { VoteEntity } from './vote.entity';
@Entity('worksite')
export class WorksiteEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'nom', type: 'varchar' })
  nom: string;

  @Column({ name: 'adresse', type: 'varchar' })
  addresse: string;

  @Column({ name: 'description', type: 'varchar' })
  description: string;

  @Column({ name: 'dateFin', type: 'date' })
  dateFin: Date;

  @Column({ name: 'nomClient', type: 'varchar' })
  nomClient: string;

  @Column({ name: 'nomRespoSec', type: 'varchar' })
  nomRespoSec: string;

  @Column({ name: 'nbCollaborateur', type: 'int' })
  nbCollaborateur: number;

  @Column({ name: 'joursSansAccident', type: 'int' })
  joursSansAccident: number;

  @ManyToMany(() => AdminEntity, (admin) => admin.worksites, {onDelete: "CASCADE"})
  @JoinTable({
    name: "worksite_admin_id",
    joinColumn: {
      name: "worksite",
      referencedColumnName: "id"
      
    },
    inverseJoinColumn: {
      name: "admins",
      referencedColumnName: "id"
    }
  })
  respoChantier: AdminEntity[];

  @OneToMany(() => VoteEntity, (vote) => vote.worksite,{onDelete: "CASCADE"})
  votes: VoteEntity[];
}
