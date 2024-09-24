import { AuthModule } from './auth';
import { ClassModule } from './class';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppDataSource } from '../data-source';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    AuthModule,
    ClassModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...AppDataSource.options,
        autoLoadEntities: true,
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
