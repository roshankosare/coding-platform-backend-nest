import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserAuthModule } from 'src/user-auth/user-auth.module';
import { AuthValidationServie } from './auth-validation.service';

@Module({
  imports:[UserAuthModule],
  controllers: [AuthController],
  providers: [AuthService,AuthValidationServie]
})
export class AuthModule {}
