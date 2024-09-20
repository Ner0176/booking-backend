import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth';
import { AppDataSource } from '../data-source';

@Module({
  imports: [
    AuthModule,
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
