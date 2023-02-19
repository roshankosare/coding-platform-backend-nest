import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Request, Response } from 'express';
import { CurrentUser } from 'src/common/currentUserType';
import { JwtAuthGuard } from 'src/jwt/jwtGuard';
import {
  CommentDto,
  CreateCommentDto,
} from './entities/commnet/dto/create-comment.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createPostDto: CreatePostDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const user = <CurrentUser>req.user;
    createPostDto.auther = user.userId;
    const response = await this.postService.create(createPostDto);
    res.status(response.statusCode).json(response);
    return;
  }

  @Get()
  async findAll(@Req() req: Request, @Res() res: Response) {
    const response = await this.postService.find();
    res.status(response.statusCode).json(response);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const response = await this.postService.findOne({ postId: id });
    res.status(response.statusCode).json(response);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const response = await this.postService.update({ postId: id }, {});
    res.status(response.statusCode).json(response);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const response = await this.postService.remove({});
    res.status(response.statusCode).json(response);
  }

  // POST COMMNETS ROUTES STARTS HERE
  @UseGuards(JwtAuthGuard)
  @Patch('comment/:id')
  async createComment(
    @Param('id') id: string,
    @Body() commentDtoFromRequest: CommentDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const user = <CurrentUser>req.user;

    const commentDto: CreateCommentDto = {
      comment: commentDtoFromRequest.comment,
      auther: user.userId,
      postId: id,
    };

    const response = await this.postService.createComment(commentDto);
    res.status(response.statusCode).json(response);
    return;
  }
}
