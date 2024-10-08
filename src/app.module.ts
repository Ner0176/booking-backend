import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppDataSource } from '../data-source';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule, ClassModule, UserModule } from './modules';

@Module({
  imports: [
    AuthModule,
    UserModule,
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
