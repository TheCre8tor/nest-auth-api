import { Controller, Body, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from '../service/auth.service';
import CreateUserDto from 'src/user/dto/create-user.dto';
import LoginUserDto from 'src/user/dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('/register')
  async registerUser(@Body() dto: CreateUserDto, @Res() response: Response) {
    return await this.service.registerUser(dto, response);
  }

  @Post('/login')
  async loginUser(@Body() dto: LoginUserDto, @Res() response: Response) {
    return await this.service.loginUser(dto, response);
  }

  @Get('/user')
  authUser(@Req() request: Request, @Res() response: Response) {
    return this.service.authUser(request, response);
  }

  @Post('/refresh')
  refreshUser(@Req() request: Request, @Res() response: Response) {
    return this.service.refreshUser(request, response);
  }

  @Get('/logout')
  logoutUser(@Res() response: Response) {
    return this.service.logoutUser(response);
  }
}
