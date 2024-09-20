import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DayOfWeek } from './dto';
import { RecurringSchedule } from './recurring-schedule.entity';
import { Reservation } from './reservation.entity';

@Entity()
export class Class {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  start: Date;

  @Column()
  end: Date;

  @Column({ type: 'enum', enum: DayOfWeek })
  day_of_week: DayOfWeek;

  @Column()
  capacity: number;

  @Column()
  current_count: number;

  @OneToMany(() => RecurringSchedule, (schedule) => schedule.class, {
    nullable: true,
  })
  schedules: RecurringSchedule[];

  @OneToMany(() => Reservation, (reservation) => reservation.class, {
    nullable: true,
  })
  reservations: Reservation[];
}
