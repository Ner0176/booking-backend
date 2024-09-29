import { Class } from 'src/entities';
import { Module } from '@nestjs/common';
import { ClassService } from './class.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassController } from './class.controller';

@Module({
  providers: [ClassService],
  controllers: [ClassController],
  imports: [TypeOrmModule.forFeature([Class])],
})
export class ClassModule {}
