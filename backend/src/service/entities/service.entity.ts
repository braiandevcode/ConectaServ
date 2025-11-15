import { Tasker } from 'src/tasker/entities/tasker.entity';
import { EServiceGarden } from 'src/types/enums/enumServiceGarden';
import { EServiceRepair } from 'src/types/enums/enumServiceRepair';
import { EServiceMoving } from 'src/types/enums/enumServicesMoving';
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
  serviceName: EServiceGarden | EServiceRepair | EServiceMoving;

  //RELACION N:N MUCHOS SERVICIOS PUEDEN PERTENECER A MUCHOS USUARIOS
  @ManyToMany(() => Tasker, (tasker) => tasker.services)
  taskers: Tasker[];
}
