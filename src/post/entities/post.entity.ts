export interface Post{
    postId:string;
    title:string;
    postContaint:string;
    createdAt:Date;
    updatedAt:Date;
    likes:number;
    dislikes:number;
    auther:string;
    comments:string[];
    tags:string[];
}
