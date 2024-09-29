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
  id: number;

  @IsString()
  email: string;

  @IsBoolean()
  isAdmin: boolean;
}

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
