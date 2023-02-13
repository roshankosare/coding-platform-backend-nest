import { Injectable } from '@nestjs/common';

import { UpdateQuery } from 'mongoose';
import { CreateUserAuthDto } from './dto/create-user-auth.dto';
import { UpdateUserAuthDto } from './dto/update-user-auth.dto';
import { UserAuthDocument } from './entities/user-auth-mongo.entity';
import { UserAuth } from './entities/user-auth.entity';
import { UserAuthRepository } from './user-auth.repository';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UserAuthService {
  constructor(private readonly userAuthRespository: UserAuthRepository) {}

  async create(createUserAuthDto: CreateUserAuthDto): Promise<UserAuth> {
    const user: UserAuth = {
      userId: uuid(),
      email: createUserAuthDto.email,
      password: createUserAuthDto.password,
      username: createUserAuthDto.username,
    };
    return await this.userAuthRespository.create(user);
  }

  async findOne(params: Partial<UserAuth>): Promise<UserAuth> {
    
    return await this.userAuthRespository.findOne(params);
  }

  async update(
    id: number,
    updateUserAuthDto: UpdateUserAuthDto,
  ): Promise<UserAuth> {
    let updateUserAuthQuery: UpdateQuery<UserAuthDocument> = {};
    if (updateUserAuthDto.username)
      updateUserAuthQuery.$set = { username: updateUserAuthDto.username };

    if (updateUserAuthDto.email)
      updateUserAuthQuery.$set = { email: updateUserAuthDto.email };

    if (updateUserAuthDto.passowrd)
      updateUserAuthQuery.$set = { password: updateUserAuthDto.passowrd };

    const doc = await this.userAuthRespository.findOneAndUpdate(
      { userId: id },
      updateUserAuthQuery,
    );

    return doc;
  }

  async deleteOne(userAuthFilterQuery: Partial<UserAuth>) {
    const { email } = userAuthFilterQuery;
    return await this.userAuthRespository.findOneAndDelete({ email: email });
  }
}
