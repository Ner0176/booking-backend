import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

const MIN_PSWD_LENGTH = 8;

export class JWTokenDto {
  @IsNumber()
  sub: number;

  @IsString()
  email: string;

  @IsBoolean()
  @IsOptional()
  isAdmin?: boolean;
}

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @Length(9)
  @IsString()
  @IsOptional()
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
