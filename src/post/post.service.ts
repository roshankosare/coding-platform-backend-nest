import { HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { PostRepository } from './post.respository';
import { v4 as uuid } from 'uuid';
import { HttpResponse } from 'src/common/httpResponse';
import { FilterQuery, UpdateQuery } from 'mongoose';
import { PostDocument } from './entities/post.entity.mongo';
import { CommentService } from './entities/commnet/commnet.service';
import { CreateCommentDto } from './entities/commnet/dto/create-comment.dto';
import { CommentEntity } from './entities/commnet/entity/comment.entity';
// import postAgrregatePipeline from './post-mogo-queries/post.filterQuery';

@Injectable()
export class PostService {
  constructor(
    private readonly postRespository: PostRepository,
    private readonly commentService: CommentService,
  ) {}
  async create(createPostDto: CreatePostDto): Promise<HttpResponse> {
    const newPost: Post = {
      postId: uuid(),
      title: createPostDto.title,
      postContaint: createPostDto.postContaint,
      createdAt: new Date(),
      updatedAt: new Date(),
      likes: 0,
      dislikes: 0,
      auther: createPostDto.auther,
      comments: [],
      tags: [],
    };
    const post = await this.postRespository.create(newPost);

    if (!post)
      return new HttpResponse({
        success: false,
        message: 'cannot create new post somthing went wrong',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });

    return new HttpResponse({
      success: true,
      message: 'post created ',
      statusCode: HttpStatus.CREATED,
      data: post,
    });
  }

  async find(): Promise<HttpResponse> {
    const posts = await this.postRespository.find({});
    return new HttpResponse({
      success: true,
      message: 'posts fetched ',
      statusCode: HttpStatus.OK,
      data: posts,
    });
  }

  async findOne(postFilterQuery: Partial<Post>): Promise<HttpResponse> {
    const post = await this.postRespository.findWithAggrigattion([
      {
        $match: { postId: postFilterQuery.postId },
      },
      {
        $lookup: {
          from: 'comments',
          localField: 'postId',
          foreignField: 'postId',
          as: 'comments',
          pipeline: [
            {
              $lookup: {
                from: 'users',
                as: 'user',
                localField: 'auther',
                foreignField: 'userId',
                pipeline: [
                  {
                    $project: { username: 1 },
                  },
                ],
              },
            },

            {
              $unwind: '$user',
            },
          ],
        },
      },
    ]);
    if (!post)
      return new HttpResponse({
        success: false,
        message: 'can not find post',
        statusCode: HttpStatus.NOT_FOUND,
        data: {}
      });

    return new HttpResponse({
      success: true,
      message: 'posts fetched ',
      statusCode: HttpStatus.OK,
      data: post[0],
    });
  }

  async update(
    postFilterQuery: Partial<Post>,
    updatePostDto: UpdatePostDto,
  ): Promise<HttpResponse> {
    const updatePost: UpdateQuery<PostDocument> = {};
    if (updatePostDto.addcomment) {
      updatePost.$push = { comments: updatePostDto.addcomment };
    }

    const post = await this.postRespository.findOneAndUpdate(
      postFilterQuery,
      updatePost,
    );
    if (!post)
      return new HttpResponse({
        success: false,
        message: 'can not find post',
        statusCode: HttpStatus.NOT_FOUND,
        data: post,
      });

    return new HttpResponse({
      success: true,
      message: 'posts updated ',
      statusCode: HttpStatus.OK,
      data: post,
    });
  }

  async remove(postFilterQuery: Partial<Post>): Promise<HttpResponse> {
    const post = await this.postRespository.findOneAndDelete(postFilterQuery);
    if (!post)
      return new HttpResponse({
        success: false,
        message: 'can not find post',
        statusCode: HttpStatus.NOT_FOUND,
        data: post,
      });

    return new HttpResponse({
      success: true,
      message: 'posts deleted',
      statusCode: HttpStatus.OK,
      data: post,
    });
  }

  // POST COMMENT SERVICE STARTS HERE

  async createComment(
    createCommentDto: CreateCommentDto,
  ): Promise<HttpResponse> {
    const commentDoc = await this.commentService.create(createCommentDto);

    const post = await this.postRespository.findOne({
      postId: createCommentDto.postId,
    });
    if (!post)
      return new HttpResponse({
        success: false,
        message: 'invalid post Id ',
        statusCode: HttpStatus.BAD_REQUEST,
      });

    if (commentDoc) {
      // let updatePost: UpdateQuery<PostDocument>;
      // updatePost.$push = {comments:commentDoc.commentId};
      await this.postRespository.findOneAndUpdate(
        { postId: createCommentDto.postId },
        { $push: { comments: commentDoc.commentId } },
      );
      return new HttpResponse({
        success: true,
        message: 'post created ',
        statusCode: HttpStatus.CREATED,
        data: commentDoc,
      });
    }
    return new HttpResponse({
      success: false,
      message: 'cannot create comment',
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      data: commentDoc,
    });
  }
}
