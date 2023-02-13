import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityAbstractRepositoryMongo } from 'src/database/entity-abstract.respository';
import {
  ProblemJobDocument,
  ProblemJobs,
} from './entities/problem-job.entity.mongo';

@Injectable()
export class ProblemJobRepository extends EntityAbstractRepositoryMongo<ProblemJobDocument> {
  constructor(
    @InjectModel(ProblemJobs.name) problemModel: Model<ProblemJobDocument>,
  ) {
    super(problemModel);
  }
}
