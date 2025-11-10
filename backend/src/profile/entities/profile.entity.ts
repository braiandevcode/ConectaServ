import { JoinMannager } from 'src/config/JoinMannager.';
import { DetailsProfileTasker } from 'src/details_profile_taskers/entities/details_profile_tasker.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('image_profiles')
export class Profile {
  @PrimaryColumn({ name: 'id_profile', type: 'uuid' }) //ID IMAGEN UUID VIENE DEL FRONT
  idProfile: string;
  @Column({ name: 'image_base64', type: 'text', nullable: false })
  imageBase64: string;

  @Column({ name: 'mime_type', type: 'varchar', length: 100, nullable: false })
  mimeType: string;

  @Column({ name: 'size', type: 'int', unsigned: true, nullable: false })
  size: number;

  @Column({
    name: 'original_name',
    type: 'varchar',
    length: 250,
    nullable: false,
  })
  originalName: string;

  @Column({
    name: 'order',
    type: 'tinyint',
    unsigned: true,
    nullable: false,
  })
  order: number;

  // RELACION 1:1 UNA IMAGEN DE PERFIL PUEDE PERTENECER O NO A UN SOLO REGISTRO DE DETALLES DE TASKER
  @OneToOne(() => DetailsProfileTasker, (details) => details.imageProfile)
  @JoinColumn(
    JoinMannager.manyToOneConfig({
      current: {
        name: 'id_details_profile_tasker',
        referencedColumnName: 'idDetailsProfileTasker',
        fkName: 'fk_profile_details_profile_tasker',
      },
    }),
  ) //FK DE CLAVE DE DETALLES DE PERFIL DE UN TASKER EN TABLA PERFIL
  detailsProfileTasker: DetailsProfileTasker;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
