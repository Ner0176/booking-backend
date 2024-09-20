import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Logger,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginPayload, RegisterPayload } from './auth.interface';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.OK)
  async register(@Body() payload: RegisterPayload) {
    try {
      return await this.authService.register(payload);
    } catch (e) {
      this.logger.error(`An error ocurred while trying to register: ${e}`);
      throw new HttpException(
        'An error ocurred while trying to register',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() payload: LoginPayload) {
    try {
      return await this.authService.login(payload);
    } catch (e) {
      this.logger.error(`An error ocurred while trying to login: ${e}`);
      throw new HttpException(
        'An error ocurred trying to login',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
