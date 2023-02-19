import { Module } from '@nestjs/common';
import { UserAuthService } from './user-auth.service';
import { UserAuthRepository } from './user-auth.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UserAuthSchema } from './entities/user-auth-mongo.entity';

@Module({
  imports:[ MongooseModule.forFeature([
    { name: Users.name, schema: UserAuthSchema },
  ]),],
  controllers: [],
  providers: [UserAuthService, UserAuthRepository],
  exports: [UserAuthService],
})
export class UserAuthModule {}
