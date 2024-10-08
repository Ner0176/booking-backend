import {
  Get,
  Param,
  Delete,
  Logger,
  HttpStatus,
  Controller,
  HttpException,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private userService: UserService) {}

  @Get('listAll')
  async getAllUsers() {
    try {
      return await this.userService.getUsersList();
    } catch (e) {
      this.logger.error(
        `An error ocurred while getting all clients information: ${e}`,
      );
      throw new HttpException(
        'An error ocurred while getting all clients information',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':userId')
  async deleteUser(@Param('userId') clientId: string) {
    try {
      await this.userService.deleteUser(clientId);
    } catch (e) {
      this.logger.error(
        `An error ocurred while trying to delete the client (id: ${clientId}): ${e}`,
      );
      throw new HttpException(
        `An error ocurred while trying to delete the client (id: ${clientId})`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
