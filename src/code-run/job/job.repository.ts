import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityAbstractRepositoryMongo } from 'src/database/entity-abstract.respository';
import { JObDocument, Jobs } from './entity/job.entity-mongo';


@Injectable()
export class JobRepository extends EntityAbstractRepositoryMongo<JObDocument> {
  constructor(@InjectModel(Jobs.name) jobModel: Model<JObDocument>) {
    super(jobModel);
  }
}
