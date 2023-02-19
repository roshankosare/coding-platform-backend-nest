import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Post } from "./post.entity";


export type PostDocument = HydratedDocument<Posts>
@Schema()
export class Posts implements Post {
    
    @Prop()
    postId: string;
    @Prop()
    title: string;
    @Prop()
    postContaint: string;
    @Prop()
    createdAt: Date;
    @Prop()
    updatedAt: Date;
    @Prop()
    likes: number;
    @Prop()
    dislikes: number;
    @Prop()
    auther: string;
    @Prop()
    tags: string[];
    @Prop()
    comments: string[];

}

export const PostSchmea = SchemaFactory.createForClass(Posts);