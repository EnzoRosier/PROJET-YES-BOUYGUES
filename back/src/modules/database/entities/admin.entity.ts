import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { WorksiteEntity } from './worksite.entity';
@Entity('admins')
export class AdminEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'mail', type: 'varchar' })
  mail: string;

  @Column({ name: 'password', type: 'varchar' })
  password: string;

  @Column({ name: 'firstName', type: 'varchar' })
  firstName: string;

  @Column({ name: 'lastName', type: 'varchar' })
  lastName: string;

  @Column({ name: 'isSuperAdmin', type: 'boolean' })
  isSuperAdmin: boolean;

  @ManyToMany(() => WorksiteEntity, (worksite) => worksite.respoChantier, {onDelete: "CASCADE"})
  worksites: WorksiteEntity[];
}
