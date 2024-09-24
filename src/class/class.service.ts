import { Repository } from 'typeorm';
import { Class, User } from 'src/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { NewClassPayload } from './class.interface';

@Injectable()
export class ClassService {
  private readonly logger = new Logger(ClassService.name);

  constructor(
    @InjectRepository(Class)
    private classRepository: Repository<Class>,
  ) {}

  async createClass(data: NewClassPayload) {}
}
