import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

//ENTIDAD DE LOCALIDAD ELEGIDA POR EL USUAURIO
@Entity('locations')
export class Location {
  @PrimaryGeneratedColumn('uuid', { name: 'id_location'})
  idLocation: string;

  @Column({ name: 'city', type: 'varchar', length: 150, nullable: false })
  city: string;

  //RELACIONES ==> UNA MISMA LOCALIDAD PUEDE PERTENECER A MUCHOS USUARIOS
  @OneToMany(() => User, (user) => user.city)
  user: User[]; //==> VARIOS USUARIOS TIENEN UNA MISMA CIUDAD

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'delete_at', type: 'timestamp' })
  deleteAtAt: Date;
}
