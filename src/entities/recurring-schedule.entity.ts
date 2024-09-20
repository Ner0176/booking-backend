import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Class } from './class.entity';
import { User } from './user.entity';

@Entity()
export class RecurringSchedule {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => Class, (classEnt) => classEnt.schedules)
  class: Class;

  @ManyToOne(() => User, (user) => user.schedules)
  user: User;
}
