import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityAbstractRepositoryMongo } from 'src/database/entity-abstract.respository';
import { PostDocument, Posts } from './entities/post.entity.mongo';

@Injectable()
export class PostRepository extends EntityAbstractRepositoryMongo<PostDocument> {
  constructor(
    @InjectModel(Posts.name)
    postModel: Model<PostDocument>,
  ) {
    super(postModel);
  }
}
