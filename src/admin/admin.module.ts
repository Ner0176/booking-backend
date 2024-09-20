import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities';

@Module({
  providers: [AdminService],
  controllers: [AdminController],
  imports: [TypeOrmModule.forFeature([User])],
})
export class AdminModule {}
