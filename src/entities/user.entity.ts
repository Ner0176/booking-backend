import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Auth } from './auth.entity';

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

  @Column({ default: false })
  isAdmin: boolean;

  @OneToOne(() => Auth, (auth) => auth.user)
  auth: Auth;
}
