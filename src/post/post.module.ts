import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Posts, PostSchmea } from './entities/post.entity.mongo';
import { PostRepository } from './post.respository';
import { AuthencationModule } from 'src/jwt/authentication.module';
import {
  Comments,
  CommentSchema,
} from './entities/commnet/entity/comment.entity.mongo';
import { CommentRepository } from './entities/commnet/comment.repository';
import { CommentService } from './entities/commnet/commnet.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Posts.name, schema: PostSchmea },
      {
        name: Comments.name,
        schema: CommentSchema,
      },
    ]),
  ],
  controllers: [PostController],
  providers: [
    PostService,
    PostRepository,
    AuthencationModule,
    CommentRepository,
    CommentService,
  ],
})
export class PostModule {}
