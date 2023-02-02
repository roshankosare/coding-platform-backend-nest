import { Prop,Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { UserProfile } from './user-profile.entity';

export type UserProfileDocument  = HydratedDocument<UserProfileMongoEntity>;


@Schema()
export class UserProfileMongoEntity implements UserProfile {
  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop()
  userId: string;

  @Prop()
  followers: string[];

  @Prop()
  followings: string[];

  @Prop()
  displayImage: string;

  @Prop()
  dob: Date;

  @Prop()
  lastUpdated: Date;

  @Prop()
  name: string;

  @Prop()
  stars: number;

  @Prop()
  createdAt: Date;
}


export const UserProfileSchmea = SchemaFactory.createForClass(UserProfileMongoEntity);