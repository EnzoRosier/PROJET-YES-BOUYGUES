import {
  BaseEntity,
  Column,
  Entity,
  PrimaryColumn,
} from 'typeorm';

@Entity('appconfig')
export class AppConfigEntity extends BaseEntity {
  @PrimaryColumn()
  key: string;

  @Column({ name: 'value', type: 'varchar', nullable:true })
  value: string;
}