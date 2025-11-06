import { Experience } from 'src/experiences/entities/experience.entity';
import { Profile } from 'src/profile/entities/profile.entity';
import { Tasker } from 'src/tasker/entities/tasker.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// ENTIDAD 'details_profile_taskers'
@Entity('details_profile_taskers')
export class DetailsProfileTasker {
  @PrimaryGeneratedColumn('uuid', { name: 'id_details_profile_tasker' })
  idDetailsProfileTasker: string;

  @Column({ name: 'description', type: 'text', nullable: true })
  description: string;

  // RELACION 1:1 UN REGISTRO DE DE DETALLES DEL PERFIL DEL TASKER ==> PUEDE ESTAR ASOCIADO A UNA O NINGUNA IMAGEN DE PERFIL
  @OneToOne(() => Profile, (image) => image.detailsProfileTasker)
  imageProfile: Profile;

  // RELACION  1:M UN REGISTRO DE DE DETALLES DEL PERFIL DEL TASKER ==> PUEDE ESTAR ASOCIADO A UNA O VARIAS O NINGUNA IMAGEN DE EXPERIENCIAS
  @OneToMany(() => Experience, (image) => image.details)
  imagesExperiences: Experience[];

  // RELACION  1:1 UN REGISTRO DE DETALLES DE PERFIL SOLO TENDRA DETALLES DE UN TASKER
  @OneToOne(() => Tasker, (tasker) => tasker.detailsProfileTasker)
  tasker:Tasker;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
