import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ReservationStatus } from './dto';
import { Class } from './class.entity';
import { User } from './user.entity';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'enum', enum: ReservationStatus })
  status: ReservationStatus;

  @Column()
  lastModification: Date;

  @ManyToOne(() => Class, (classEnt) => classEnt.reservations)
  class: Class;

  @ManyToOne(() => User, (user) => user.reservations)
  user: User;
}
