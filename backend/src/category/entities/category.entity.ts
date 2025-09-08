import { Tasker } from "src/tasker/entities/tasker.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";

@Entity("categories")
export class Category {
    @PrimaryColumn()
    idCategory: string;
    @Column()
    categoryName: string;

    //Relaciones
    @ManyToOne(type=>Tasker, tasker=>tasker.category)
    public tasker: Tasker;
}