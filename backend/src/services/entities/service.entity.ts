import { Tasker } from 'src/tasker/entities/tasker.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('services')
export class Service {
  @PrimaryGeneratedColumn('uuid', { name: 'id_service' }) //genera un id automaticamente USARLO EN LAS DEMAS ENTIDADES
  idService: string;

  @Column({
    name: 'service_name',
    type: 'varchar',
    length: 250,
    nullable: false,
  })
  serviceName: string;

  //RELACION N:N MUCHOS SERVICIOS PUEDEN PERTENECER A MUCHOS USUARIOS
  @ManyToMany(() => Tasker, (tasker) => tasker.services)
  taskers: Tasker[];
}
