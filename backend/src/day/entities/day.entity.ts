import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

// ENTIDAD DE DIAS ELEGIDOS
@Entity('days')
export class Day {
  @PrimaryGeneratedColumn('uuid', { name: 'id_day' })
  idDay: string;

  @Column({ name: 'day_name', type: 'varchar', length: 250, nullable: false })
  dayName: string;

  @ManyToMany(() => User, (users) => users.days)
  users: User[];
}
