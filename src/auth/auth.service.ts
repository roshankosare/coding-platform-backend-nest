import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { HttpResponse } from 'src/common/httpResponse';
import { UserAuthService } from 'src/user-auth/user-auth.service';

import { SignInUserDto } from './dto/sign-in-user.dto';
import { SignUpUserDto } from './dto/sing-up-user.dto';
import { ValidateUserService } from './validate.service';

@Injectable()
export class AuthService {
  
  constructor(
    private readonly userAuthService: UserAuthService,
    private readonly validationService: ValidateUserService,
    private readonly jwtService:JwtService
  ) {}

  async signUp(userDto:SignUpUserDto) {
    const { email, password, username } = userDto;
    const errors = this.validationService.validateCreateUserDto(userDto);
    
    if (errors.length > 0){

      return Promise.reject(
        new HttpResponse({
          success: false,
          message: 'invalid parameters',
          statusCode: HttpStatus.BAD_REQUEST,
          data: {
            authenticated: false,
            error: errors,
          },
        }),
      );

    }
     

    if (await this.userAuthService.findOne({ email:email }))
      return Promise.reject(
        new HttpResponse({
          success: false,
          message: 'email is already taken',
          statusCode: HttpStatus.BAD_REQUEST,
          data: {
            authencated: false,
            errors: {
              emailError:"email is already taken"
            },
          },
        }),
      );

    const hashedPassword = await hash(password, 12);

    const user = await this.userAuthService.create({
      username,
      email,
      password: hashedPassword,
    });

    const userInfo = {
      username: user.username,
      email: user.email,
    };

    const payload = {
      userId: user.userId,
      username: user.username,
      email: user.email,
    };
    const access_token = this.jwtService.sign(payload);

    const response = new HttpResponse({
      success: true,
      message: 'sign up successful',
      statusCode: HttpStatus.CREATED,
      data: {
        autheticated: true,
        user: userInfo,
      },
    });

    return Promise.resolve({ response, access_token });
  }

  async signIn(userDto: SignInUserDto) {
    const { email, password } = userDto;

    const errors = this.validationService.validateSignInUserDto(userDto);
    if (errors.length > 0)
      return Promise.reject(
        new HttpResponse({
          success: false,
          message: 'invalid parameters',
          statusCode: HttpStatus.UNAUTHORIZED,
          data: {
            authenticated: false,
            error: errors,
          },
        }),
      );

    const user = await this.userAuthService.findOne({ email:email });
   

    

    if (!user)
      return Promise.reject(
        new HttpResponse({
          success: false,
          message: 'email is incorrect ',
          statusCode: HttpStatus.UNAUTHORIZED,
          data: {
            authenticated: false,
            errors: {
              emailError:"incorrect email id"
            },
          },
        }),
      );

    if (!(await compare(password, user.password)))
      return Promise.reject(
        new HttpResponse({
          success: false,
          message: 'incorrect password ',
          statusCode: HttpStatus.UNAUTHORIZED,
          data: {
            authenticated: false,
            errors: {
              passwordError:"incorrect password"
            },
          },
        }),
      );
      const userInfo = {
        username: user.username,
        email: user.email,
      };

    const payload = {
      userId: user.userId,
      username: user.username,
      email: user.email,
    };
    const access_token = this.jwtService.sign(payload);

    const response = new HttpResponse({
      success: true,
      message: 'sign In successful ',
      statusCode: HttpStatus.OK,
      data: {
        authenticated: true,
        user: userInfo,
      },
    });
    return Promise.resolve({ response, access_token });
  }
}