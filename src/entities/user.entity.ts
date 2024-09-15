import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Auth } from './auth.entity';
import { UnusedCredit } from './unused-credit';
import { RecurringSchedule } from './recurring-schedule';
import { Reservation } from './reservation';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ length: 9, nullable: true })
  phone: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ default: false })
  isAdmin: boolean;

  @OneToOne(() => Auth, (auth) => auth.user)
  auth: Auth;

  @OneToMany(() => UnusedCredit, (unusedCredit) => unusedCredit.user, {
    nullable: true,
  })
  unusedCredits: UnusedCredit[];

  @OneToMany(() => RecurringSchedule, (schedule) => schedule.user, {
    nullable: true,
  })
  schedules: RecurringSchedule[];

  @OneToMany(() => Reservation, (reservation) => reservation.user, {
    nullable: true,
  })
  reservations: Reservation[];
}
