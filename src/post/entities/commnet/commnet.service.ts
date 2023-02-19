import { Injectable } from "@nestjs/common";
import { CommentRepository } from "./comment.repository";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { CommentEntity } from "./entity/comment.entity";
import { v4 as uuid } from "uuid";




@Injectable()
export class CommentService {

    constructor(private readonly commentRespository:CommentRepository){}

    async create(createCommentDto:CreateCommentDto):Promise<CommentEntity>{

        const comment:CommentEntity = {
            commentId:uuid(),
            postId: createCommentDto.postId,
            comment: createCommentDto.comment,
            auther: createCommentDto.auther,
            createdAt: new Date()
        }
        return await this.commentRespository.create(comment);
    }

    async find(commentFileterQuery:Partial<CommentEntity>):Promise<CommentEntity[]>{

        return await this.commentRespository.find(commentFileterQuery);
    }

}