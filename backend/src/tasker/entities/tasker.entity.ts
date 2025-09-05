import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { Category } from "src/category/entities/category.entity";
import { Location } from "src/location/entities/location.entity";

@Entity("taskers")
export class Tasker {
    @PrimaryColumn()
    idTasker: string;
    @Column({length: 150})
    fullName: string;
    @Column()
    userName: string;
    @Column('text')
    description: string;
    @Column()
    email: string;
    @Column()
    password: string;

    //Relaciones
    @ManyToOne(type=>Location, location=>location.tasker)
    @JoinColumn()
    public location: Location;

    @ManyToOne(type=>Category, category=>category.tasker)
    @JoinColumn()
    public category: Category;
}
