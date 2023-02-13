import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityAbstractRepositoryMongo } from 'src/database/entity-abstract.respository';
import { ProblemDocument, Problems } from './entities/problem.mongo.entity';

@Injectable()
export class ProblemRepository extends EntityAbstractRepositoryMongo<ProblemDocument> {
  constructor(
    @InjectModel(Problems.name) problemModel: Model<ProblemDocument>,
  ) {
    super(problemModel);
  }
}
