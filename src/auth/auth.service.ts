import { HttpStatus, Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { HttpResponse } from 'src/common/httpResponse';
import { UserAuthService } from 'src/user-auth/user-auth.service';
import { AuthValidationServie } from './auth-validation.service';
import { SignInUserDto } from './dto/sign-in-user.dto';
import { SignUpUserDto } from './dto/sing-up-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userAuthService: UserAuthService,
    private readonly authValidationService: AuthValidationServie,
  ) {}

  async signUp(signUpUserDto: SignUpUserDto) {
    const errors = this.authValidationService.singUpValidation(signUpUserDto);
    if (errors.length > 0)
      return new HttpResponse({
        success: false,
        message: 'incomplete data provided',
        statusCode: HttpStatus.BAD_REQUEST,
        data: errors,
      });
    const { email, password, username } = signUpUserDto;

    const isUserExists = await this.userAuthService.findOne({ email: email });
    if (isUserExists)
      return new HttpResponse({
        success: false,
        message: 'email is already taken',
        statusCode: HttpStatus.BAD_REQUEST,
      });

    const hashedPassword = await hash(password, 12);
    const user = await this.userAuthService.create({
      email: email,
      username: username,
      password: hashedPassword,
    });

    if (user) {
      const { password, ...otherinfo } = user;
      return new HttpResponse({
        success: true,
        message: 'Account created..',
        statusCode: HttpStatus.CREATED,
        data: { otherinfo },
      });
    }

    //database error
    return new HttpResponse({
      success: false,
      message: 'Server Error',
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }

  async signIn(signInUserDto: SignInUserDto) {
    const errors = this.authValidationService.singInValidation(signInUserDto);
    if (errors.length > 0)
      return new HttpResponse({
        success: false,
        message: 'incomplete data provided',
        statusCode: HttpStatus.BAD_REQUEST,
        data: errors,
      });

    const { email, password } = signInUserDto;

    const user = await this.userAuthService.findOne({ email: email });
    if (!user)
      return new HttpResponse({
        success: false,
        message: 'Email is not registered',
        statusCode: HttpStatus.BAD_REQUEST,
      });

    const isCorrectPassword = await compare(password, user.password);
    if (!isCorrectPassword)
      return new HttpResponse({
        success: false,
        message: 'incorrect password',
        statusCode: HttpStatus.BAD_REQUEST,
      });

    delete user.password;
    return new HttpResponse({
      success: true,
      message: 'Authentication success',
      statusCode: HttpStatus.CREATED,
      data: user,
    });
  }
}
