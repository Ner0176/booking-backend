import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RecurringSchedule } from './recurring-schedule.entity';
import { Reservation } from './reservation.entity';

@Entity()
export class Class {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  date: Date;

  @Column({ type: 'time' })
  start: string;

  @Column({ type: 'time' })
  end: string;

  @Column()
  capacity: number;

  @Column({ default: 0 })
  currentCount: number;

  @OneToMany(() => RecurringSchedule, (schedule) => schedule.class, {
    nullable: true,
  })
  schedules: RecurringSchedule[];

  @OneToMany(() => Reservation, (reservation) => reservation.class, {
    nullable: true,
  })
  reservations: Reservation[];
}
