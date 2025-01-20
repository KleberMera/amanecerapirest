import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDTO } from 'src/models/user';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() user: UserDTO) {
    return this.authService.login(user);
  }

  @Post('sign-up')
  signUp(@Body() user: UserDTO) {
    return this.authService.signUp(user);
  }

  @Get('usuario')
  getUser() {
    return this.authService.getUser();
  }

  @Get('user/:id')
  async getUserById(@Param('id') id: string) {
    return await this.authService.getUserById(Number(id));
  }
}
