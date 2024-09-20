import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Auth, User } from 'src/entities';
import { DataSource, Repository } from 'typeorm';
import { LoginPayload, RegisterPayload } from './auth.interface';
import * as bcrypt from 'bcrypt';
import * as EmailValidator from 'email-validator';

@Injectable()
export class AuthService {
  private readonly MIN_PSWD_LENGTH = 8;
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

    if (
      !name ||
      !EmailValidator.validate(email) ||
      password.length < this.MIN_PSWD_LENGTH
    ) {
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

    if (
      !EmailValidator.validate(email) ||
      password.length < this.MIN_PSWD_LENGTH
    ) {
      this.logger.error('Invalid payload fields');
      throw new HttpException('Invalid payload fields', HttpStatus.BAD_REQUEST);
    }

    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['auth'],
    });
    if (!user) {
      this.logger.error('No account found with this email address');
      throw new HttpException(
        'No account found with this email address',
        HttpStatus.NOT_FOUND,
      );
    }

    const equalPasswords = await bcrypt.compare(password, user.auth.password);

    if (!equalPasswords) {
      this.logger.error('Password is not correct');
      throw new HttpException(
        'Password is not correct',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const { auth, ...userNoAuth } = user;
    return userNoAuth;
  }
}
