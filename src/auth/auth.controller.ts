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
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { HttpResponse } from 'src/common/httpResponse';
import { JwtAuthGuard } from 'src/jwt/jwtGuard';
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
    try {
      const { response, access_token } = await this.authService.signUp(
        signUpUserDto,
      );

      return res
        .status(response.statusCode)
        .cookie('jwt', access_token)
        .json(response);
    } catch (response) {
      return res.status(response.statusCode).json(response);
    }
  }

  @Post('signin')
  async signIn(
    @Body() signInUserDto: SignInUserDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const { response, access_token } = await this.authService.signIn(
        signInUserDto,
      );

      return res
        .status(response.statusCode)
        .cookie('token', access_token)
        .json(response);
    } catch (response) {
      return res.status(response.statusCode).json(response);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get("/auth")
  async authenticateUser(@Req() req: Request, @Res() res: Response) {
    
    // const user = <CurrentUser>req.user;
    // const userInfo = {
    //   username:user.username,
    //   email:user.email

    // }
    const response = new HttpResponse({
      success: true,
      message: 'legit User',
      statusCode: HttpStatus.ACCEPTED,
      data:{
        authenticated:true,
        // user:userInfo
      }
    });
    return res.status(response.statusCode).json(response);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/signout")
  async logout(@Req() req: Request, @Res() res: Response) {
    
    // const user = <CurrentUser>req.user;
    // const userInfo = {
    //   username:user.username,
    //   email:user.email

    // }
    const response = new HttpResponse({
      success: true,
      message: 'logged out ..',
      statusCode: HttpStatus.ACCEPTED,
      data:{
      }
    });
    res.clearCookie("token");
    return res.status(response.statusCode).json(response);
  }
}
