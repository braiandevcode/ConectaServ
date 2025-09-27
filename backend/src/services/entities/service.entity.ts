import { Tasker } from "src/tasker/entities/tasker.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("services")
export class Service {
@PrimaryGeneratedColumn("uuid") //genera un id automaticamente USARLO EN LAS DEMAS ENTIDADES
  idService: string;

  @Column()
  serviceName: string;

  @ManyToMany(() => Tasker, tasker => tasker.services)
  taskers: Tasker[];
}
