import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { CommentEntity } from "./comment.entity";

export type CommnetDocument = HydratedDocument<CommentEntity>;

@Schema()
export class Comments implements CommentEntity{
    @Prop()
    commentId: string;
    @Prop()
    postId: string;
    @Prop()
    comment: string;
    @Prop()
    auther: string;
    @Prop()
    createdAt: Date;
    
}

export const CommentSchema = SchemaFactory.createForClass(Comments);