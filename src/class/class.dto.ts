import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { DayOfWeek } from 'src/entities';

export class CreateClassDto {
  @IsString()
  @IsNotEmpty()
  end: string;

  @IsString()
  @IsNotEmpty()
  start: string;

  @IsNumber()
  capacity: number;

  @IsEnum(DayOfWeek)
  weekDay: DayOfWeek;
}

export class ModifyClassDto {
  @IsNumber()
  id: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  end?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  start?: string;

  @IsNumber()
  @IsOptional()
  capacity?: number;

  @IsOptional()
  @IsEnum(DayOfWeek)
  weekDay?: DayOfWeek;
}
