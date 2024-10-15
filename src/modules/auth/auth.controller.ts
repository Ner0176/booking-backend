import {
  Post,
  Body,
  Logger,
  HttpCode,
  HttpStatus,
  Controller,
  HttpException,
} from '@nestjs/common';
import { Public } from 'src/decorators';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './auth.dto';

@Public()
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private authService: AuthService) {}

  @Post('signUp')
  @HttpCode(HttpStatus.OK)
  async signUp(@Body() payload: RegisterDto) {
    try {
      return await this.authService.signUp(payload);
    } catch (e) {
      this.logger.error(`An error ocurred while trying to sign up: ${e}`);
      throw new HttpException(
        'An error ocurred while trying to sign up',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() payload: LoginDto) {
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
