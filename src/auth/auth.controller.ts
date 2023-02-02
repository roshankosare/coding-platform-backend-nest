import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { SignInUserDto } from './dto/sign-in-user.dto';
import { SignUpUserDto } from './dto/sing-up-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signUp(
    @Body() signUpUserDto: SignUpUserDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const response = await this.authService.signUp(signUpUserDto);
    return res.status(response.statusCode).json(response);
  }

  @Post('signin')
  async signIn(
    @Body() singInUserDto: SignInUserDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const response = await this.authService.signIn(singInUserDto);
    res.status(response.statusCode).json(response);
  }
}
