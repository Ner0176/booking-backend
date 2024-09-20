import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth';
import { AppDataSource } from '../data-source';
import { AdminModule } from './admin';

@Module({
  imports: [
    AuthModule,
    AdminModule,
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
