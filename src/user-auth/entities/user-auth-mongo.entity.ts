import { Prop ,Schema} from '@nestjs/mongoose';
import { SchemaFactory } from '@nestjs/mongoose/dist';
import { HydratedDocument } from 'mongoose';
import { UserAuth } from './user-auth.entity';

export type UserAuthDocument = HydratedDocument<Users>;

@Schema()
export class Users implements UserAuth {
  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  userId: string;

  @Prop()
  username: string;
}

export const UserAuthSchema = SchemaFactory.createForClass(Users);
