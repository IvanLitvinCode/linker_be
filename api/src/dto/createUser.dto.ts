import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsEmail()
  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly phonenumber: string;

  readonly image: string;

  readonly bio?: string;
  readonly telegram?: string;
  readonly whatsapp?: string;
  readonly viber?: string;

  readonly rate?: number;

  readonly likesCount?: number;

  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
