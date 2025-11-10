import { JoinMannager } from 'src/config/JoinMannager.';
import { DetailsProfileTasker } from 'src/details_profile_taskers/entities/details_profile_tasker.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

// ENTIDAD DE IMAGENES DE EXPERIENCIAS ELEGIDAS
@Entity('image_experiences')
export class Experience {
  @PrimaryColumn({ name: 'id_experience', type: 'uuid' }) //ID IMAGEN  UUID VIENE DEL FRONT
  idExperience: string;
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

  // RELACION M:1 UNO O MUCHOS REGISTROS DE IMAGENES DE EXPERIENCIAS PERTENECEN A UN  SOLO REGISTRO DE DETALLES DE PERFIL DE TASKER
  @ManyToOne(() => DetailsProfileTasker, (details) => details.imagesExperiences)
  @JoinColumn(
    JoinMannager.manyToOneConfig({
      current: {
        name: 'id_details_profile_tasker',
        referencedColumnName: 'idDetailsProfileTasker',
        fkName: 'fk_image_experiences_deatils_profile_tasker',
      },
    }),
  ) // FK EN TABLA EXPERIENCIAS
  details: DetailsProfileTasker;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
