import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserAuthModule } from 'src/user-auth/user-auth.module';
import { ValidateUserService } from './validate.service';
import { AuthencationModule } from 'src/jwt/authentication.module';

@Module({
  imports:[UserAuthModule,AuthencationModule],
  controllers: [AuthController],
  providers: [AuthService,ValidateUserService]
})
export class AuthModule {}
