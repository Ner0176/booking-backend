import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

const MIN_PSWD_LENGTH = 8;

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @Length(9)
  phone?: string;

  @IsString()
  @MinLength(MIN_PSWD_LENGTH)
  password: string;
}

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(MIN_PSWD_LENGTH)
  password: string;
}
