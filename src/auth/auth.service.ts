import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Auth, User } from 'src/entities';
import { DataSource, Repository } from 'typeorm';
import { LoginPayload, RegisterPayload } from './auth.interface';
import * as bcrypt from 'bcrypt';
import * as EmailValidator from 'email-validator';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private dataSource: DataSource,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
  ) {}

  async register(data: RegisterPayload) {
    const { name, email, phone, password } = data;

    if (!name || password.length < 6 || !EmailValidator.validate(email)) {
      this.logger.error('Invalid payload fields');
      throw new HttpException('Invalid payload fields', HttpStatus.BAD_REQUEST);
    }

    const alreadyExist = await this.userRepository.findOne({
      where: { email },
    });

    if (alreadyExist) {
      this.logger.error('User is already registered');
      throw new HttpException(
        'User is already registered',
        HttpStatus.CONFLICT,
      );
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = this.userRepository.create({ name, email, phone });
      const savedUser = await queryRunner.manager.save(user);

      const hashedPassword = await bcrypt.hash(
        password,
        +process.env.SALT_ROUNDS,
      );
      const auth = this.authRepository.create({
        user,
        password: hashedPassword,
      });
      await queryRunner.manager.save(auth);

      await queryRunner.commitTransaction();

      return savedUser;
    } catch (e) {
      await queryRunner.rollbackTransaction();
      this.logger.error('Error during user registration', e);
      throw new HttpException(
        'Error during user registration',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      await queryRunner.release();
    }
  }

  async login(data: LoginPayload) {
    const { email, password } = data;

    await this.userRepository.findOne({ where: { email } });
  }
}
