import { RRule } from 'rrule';
import { Class } from 'src/entities';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateClassDto, ModifyClassDto } from './class.dto';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ClassService {
  private readonly logger = new Logger(ClassService.name);

  constructor(
    private dataSource: DataSource,
    @InjectRepository(Class)
    private classRepository: Repository<Class>,
  ) {}

  async getClassesList() {
    return await this.classRepository.find();
  }

  async createClass(data: CreateClassDto) {
    const { startDate, endDate, capacity, date, weekDay, startTime, endTime } =
      data;

    if (!date && (!weekDay || !startDate || !endDate)) {
      this.logger.error('It is needed a date for creating a class');
      throw new HttpException(
        'It is needed a date for creating a class',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    let dates: Date[] = [];
    if (!date) {
      const rule = new RRule({
        freq: RRule.WEEKLY,
        dtstart: new Date(startDate),
        byweekday: [weekDay],
        until: new Date(endDate),
      });
      dates = rule.all();
    } else dates.push(new Date(date));

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      for (let i = 0; i < dates.length; i++) {
        const newClass = this.classRepository.create({
          capacity,
          end: endTime,
          date: dates[i],
          start: startTime,
        });
        await queryRunner.manager.save(newClass);
      }

      await queryRunner.commitTransaction();
    } catch (e) {
      this.logger.error('Error while classes creation');
      throw new HttpException(
        'Error while classes creation',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async modifyClass(data: ModifyClassDto) {
    const { id, start, end, capacity } = data;
    await this.classRepository.update(id, { capacity, start, end });
  }

  async deleteClass(id: string) {
    await this.classRepository.delete(id);
  }
}
