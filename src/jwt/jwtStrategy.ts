import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport/dist';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { jwtSecrate } from 'src/constants/constants';
import { CurrentUser } from 'src/common/currentUserType';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([JwtStrategy.extractJWT]),
      secretOrKey: jwtSecrate,
    });
  }

  private static extractJWT(req: Request): string | null {
    if (req.cookies && 'token' in req.cookies) {
      return req.cookies.token;
    }

    return null;
  }

  async validate(payload:any,req:Request) {

    // TODO:- VERIFY USER FORM DATABASE
    req.user = <CurrentUser>payload;
    return payload;
  }
}
