import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { Job } from './job.entity';

export type JObDocument = HydratedDocument<Jobs>;

@Schema()
export class Jobs implements Job {
  @Prop()
  userId: string;

  @Prop()
  createdAt: Date;

  @Prop()
  code: string;

  @Prop()
  language: 'c' | 'cpp' | 'java' | 'pythone' | 'node';

  @Prop()
  executionTime: number;

  @Prop()
  jobId: string;

  @Prop()
  jobStatus: 'pending' | 'completed';

  @Prop()
  errors: string;

  @Prop()
  filepath: string;

  @Prop()
  startedAt: Date;

  @Prop()
  completedAt: Date;

  @Prop()
  output: string;
}

export const JobSchema = SchemaFactory.createForClass(Jobs);
