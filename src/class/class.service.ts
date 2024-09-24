import { Repository } from 'typeorm';
import { Class } from 'src/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { CreateClassDto, ModifyClassDto } from './class.dto';

@Injectable()
export class ClassService {
  private readonly logger = new Logger(ClassService.name);

  constructor(
    @InjectRepository(Class)
    private classRepository: Repository<Class>,
  ) {}

  async getClassesList() {
    return await this.classRepository.find();
  }

  async createClass(data: CreateClassDto) {
    const newClass = this.classRepository.create(data);
    await this.classRepository.save(newClass);
  }

  async modifyClass(data: ModifyClassDto) {
    const { id, start, end, capacity, weekDay } = data;
    await this.classRepository.update(id, { capacity, start, end, weekDay });
  }

  async deleteClass(id: string) {
    await this.classRepository.delete(id);
  }
}
