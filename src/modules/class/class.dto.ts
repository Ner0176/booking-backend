import {
  IsEnum,
  IsString,
  IsOptional,
  IsNotEmpty,
  IsDateString,
} from 'class-validator';

export enum DayOfWeek {
  MONDAY = 0,
  TUESDAY = 1,
  WEDNESDAY = 2,
  THURSDAY = 3,
  FRIDAY = 4,
  SATURDAY = 5,
  SUNDAY = 6,
}

export class CreateClassDto {
  @IsString()
  @IsOptional()
  startDate?: string;

  @IsString()
  @IsOptional()
  endDate?: string;

  @IsOptional()
  @IsDateString()
  date?: string;

  @IsOptional()
  @IsEnum(DayOfWeek)
  weekDay?: DayOfWeek;

  capacity: number;

  @IsString()
  @IsNotEmpty()
  startTime: string;

  @IsString()
  @IsNotEmpty()
  endTime: string;
}

export class ModifyClassDto {
  id: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  end?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  start?: string;

  @IsOptional()
  capacity?: number;

  @IsOptional()
  @IsEnum(DayOfWeek)
  weekDay?: DayOfWeek;
}
