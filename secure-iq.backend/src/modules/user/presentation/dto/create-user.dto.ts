import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(1, { message: 'Name is required' })
  @MaxLength(50, { message: 'Name must be less than 50 characters' })
  name: string;

  @IsEmail({}, { message: 'Please provide a valid email address' })
  @MaxLength(255, { message: 'Email must be less than 255 characters' })
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(128, { message: 'Password must be less than 128 characters' })
  password: string;
}
