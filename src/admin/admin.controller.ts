import {
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
} from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  private readonly logger = new Logger(AdminController.name);

  constructor(private adminService: AdminService) {}

  @Get('clients')
  async getAllClients() {
    try {
      return await this.adminService.getUsersInfo();
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

  @Delete(':clientId')
  async removeClient(@Param('clientId') clientId: string) {
    try {
      await this.adminService.removeClient(clientId);
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
