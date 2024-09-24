import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ClassService } from './class.service';
import { CreateClassDto, ModifyClassDto } from './class.dto';

@Controller('class')
export class ClassController {
  private readonly logger = new Logger(ClassController.name);

  constructor(private classService: ClassService) {}

  @Get('listAll')
  async getAllClasses() {
    try {
      return await this.classService.getClassesList();
    } catch (e) {
      this.logger.error(`An error ocurred while getting list of classes`);
      throw new HttpException(
        'An error ocurred while getting list of classes',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('create')
  async createClass(@Body() payload: CreateClassDto) {
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

  @Patch('modify')
  async modifyClass(@Body() payload: ModifyClassDto) {
    try {
      await this.classService.modifyClass(payload);
    } catch (e) {
      this.logger.error(`An error ocurred while modifying class: ${e}`);
      throw new HttpException(
        'An error ocurred while modifying class',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':classId')
  async deleteClass(@Param('classId') id: string) {
    try {
      await this.classService.deleteClass(id);
    } catch (e) {
      this.logger.error(`An error ocurred while trying to delete class: ${e}`);
      throw new HttpException(
        'An error ocurred while trying to delete class',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
