import { Tasker } from 'src/tasker/entities/tasker.entity';
import { ECategory } from 'src/types/enums/enumCategory';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// TAMBIEN CAMBIE A USUARIO
@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid', { name: 'id_category' })
  idCategory: string;
  
  @Column({
    name: 'category_name',
    type: 'varchar',
    length: 150,
    nullable: false,
  })
  categoryName: ECategory;

  //RELACION ==> UNA CATEGORIA PUEDE PERTENCER A VARIOS TASKERS
  @OneToMany(() => Tasker, (tasker) => tasker.category)
  taskers: Tasker[]; //==> TASKER QUE PERTENECE A ESA CATEGORIA

  // FECHA DE CREACION
  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: false })
  createdAt: Date;

  // FECHA DE ACTUALIZACION
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date; // SE ACTUALIZA AUTOMÁTICAMENTE AL MODIFICAR

  // FECHA DE ELIMINACION
  @UpdateDateColumn({ name: 'deleted_at', type: 'timestamp' })
  deletedAt: Date; // FECHA DE ELIMINACION
}
