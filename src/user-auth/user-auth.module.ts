import { Module } from '@nestjs/common';
import { UserAuthService } from './user-auth.service';
import { UserAuthRepository } from './user-auth.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { UserAuthMongoEntity, UserAuthSchema } from './entities/user-auth-mongo.entity';

@Module({
  imports:[ MongooseModule.forFeature([
    { name: UserAuthMongoEntity.name, schema: UserAuthSchema },
  ]),],
  controllers: [],
  providers: [UserAuthService, UserAuthRepository],
  exports: [UserAuthService],
})
export class UserAuthModule {}
