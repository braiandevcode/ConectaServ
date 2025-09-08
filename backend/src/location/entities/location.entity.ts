import { Tasker } from "src/tasker/entities/tasker.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";

@Entity("locations")
export class Location {
    @PrimaryColumn()
    idLocation: string;
    @Column()
    locationName: string;

    //Relaciones
    @ManyToOne(type=>Tasker, tasker=>tasker.location)
    public tasker: Tasker;
}