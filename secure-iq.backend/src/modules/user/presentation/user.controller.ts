import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserUseCase } from '../application/create-user.usecase';
import { CreateUserCommand } from '../application/dto/create-user/create-user.command';
import { UpdateUserUseCase } from '../application/update-user.usecase';
import { UpdateUserCommand } from '../application/dto/update-user/update-user.command';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ForgotPasswordDto } from './dto/forgot.dto';
import { ForgotPasswordCommand } from '../application/forgot-password/forgot-password.command';
import { ForgotPasswordUsecase } from '../application/forgot-password/forgot-password.use-case';

@Controller({
  path: 'users',
  version: '1',
})
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly forgotPasswordUseCase: ForgotPasswordUsecase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateUserDto) {
    return this.createUserUseCase.execute(
      new CreateUserCommand(
        dto.name,
        dto.email,
        dto.password,
      ),
    );
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.updateUserUseCase.execute(
      new UpdateUserCommand(id, dto.name, dto.email),
    );
  }

  @Post('forgot-password')
  async forgotPassword(@Body() body: ForgotPasswordDto) {
    return this.forgotPasswordUseCase.execute(
      new ForgotPasswordCommand(body.email),
    );
  }
}
