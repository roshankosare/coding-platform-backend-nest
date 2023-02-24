import { Prop, Schema, SchemaFactory ,} from '@nestjs/mongoose';
import { Problem, TestCase } from './problem.entity';
import { HydratedDocument } from 'mongoose';

export type  ProblemDocument = HydratedDocument<Problems>;


@Schema()
export class Problems implements Problem {
  @Prop()
  autherId: string;
  @Prop()
  problemId: string;
  @Prop()
  title: string;
  @Prop()
  description: string;
  @Prop()
  likes: number;
  @Prop()
  dislikes: number;
  @Prop({type:"Object"})
  sampleTestCase: TestCase;
  @Prop()
  testCase: [TestCase];
}


export const ProblemSchema = SchemaFactory.createForClass(Problems);