import { IsEmpty } from 'class-validator';

export class ForgotPasswordDto {
  @IsEmpty()
  email: string;
}
