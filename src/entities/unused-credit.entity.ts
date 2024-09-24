import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UnusedCredit {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  expirationDate: Date;

  @ManyToOne(() => User, (user) => user.unusedCredits)
  user: User;
}
