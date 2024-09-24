import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  Post,
} from '@nestjs/common';
import { NewClassPayload } from './class.interface';
import { ClassService } from './class.service';

@Controller('class')
export class ClassController {
  private readonly logger = new Logger(ClassController.name);

  constructor(private classService: ClassService) {}

  @Post('class')
  async createClass(@Body() payload: NewClassPayload) {
    try {
      await this.classService.createClass(payload);
    } catch (e) {
      this.logger.error(`An error ocurred while creating new class: ${e}`);
      throw new HttpException(
        'An error ocurred while creating new class',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
