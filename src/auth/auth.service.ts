import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth, User } from 'src/entities';
import { DataSource, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JWTokenDto, LoginDto, RegisterDto } from './auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private dataSource: DataSource,
    private jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
  ) {}

  async register(data: RegisterDto) {
    const { name, email, phone, password } = data;

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

      return this.jwtService.sign({
        id: savedUser.id,
        email: savedUser.email,
        isAdmin: savedUser.isAdmin,
      } as JWTokenDto);
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

  async login(data: LoginDto) {
    const { email, password } = data;

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

    return this.jwtService.sign({
      id: userNoAuth.id,
      email: userNoAuth.email,
      isAdmin: userNoAuth.isAdmin,
    } as JWTokenDto);
  }
}
