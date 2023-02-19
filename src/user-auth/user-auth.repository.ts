import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import { EntityAbstractRepositoryMongo } from 'src/database/entity-abstract.respository';
import {
  UserAuthDocument,
  Users,
} from './entities/user-auth-mongo.entity';

@Injectable()
export class UserAuthRepository extends EntityAbstractRepositoryMongo<UserAuthDocument> {
  constructor(
    @InjectModel(Users.name)
    userAuthModel: Model<UserAuthDocument>,
  ) {
    super(userAuthModel);
  }
}
