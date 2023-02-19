import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { EntityAbstractRepositoryMongo } from "src/database/entity-abstract.respository";
import { Comments, CommnetDocument } from "./entity/comment.entity.mongo";


@Injectable()
export class CommentRepository extends EntityAbstractRepositoryMongo <CommnetDocument>{
    constructor( @InjectModel(Comments.name)
    commentsModel: Model<CommnetDocument>,){
        super(commentsModel);
    }
}