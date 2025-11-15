import { Tasker } from 'src/tasker/entities/tasker.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

// ENTIDAD DE HABITOS ELEGIDOS
@Entity('contexts')
export class Context {
  @PrimaryGeneratedColumn('uuid', { name: 'id_context' })
  idContext: string;

  @Column({ name: 'context_name', type:'varchar', length:250, nullable:false })
  contextName: string;

  // RELACION M:N ==> 1 O MAS HABITOS DE TRABAJO PUEDE PERTENECER A MUCHOS TASKERS
  @ManyToMany(() => Tasker, (tasker) => tasker.contexts)
  users: Tasker[];
}
