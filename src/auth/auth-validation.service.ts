import { Injectable } from '@nestjs/common';
import { SignUpUserDto } from './dto/sing-up-user.dto';

@Injectable()
export class AuthValidationServie {
  singUpValidation(signUpUserDto: SignUpUserDto) {
    const { email, password, username } = signUpUserDto;
    let errors: string[];

    if (email === undefined || null || '') errors.push('email is required..');

    if (password === undefined || null || '')
      errors.push('password is required..');

    if (username === undefined || null || '')
      errors.push('username is required..');

      return errors;
  }

  singInValidation(signUpUserDto: SignUpUserDto) {
    const { email, password, username } = signUpUserDto;
    let errors: string[];

    if (email === undefined || null || '') errors.push('email is required..');

    if (password === undefined || null || '')
      errors.push('password is required..');

    // if (username === undefined || null || '')
    //   errors.push('username is required..');

      return errors;
  }
}
