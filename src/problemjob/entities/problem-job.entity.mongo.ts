import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { TestCase } from 'src/problems/entities/problem.entity';
import { ProblemJob } from './problemjob.entity';

export type ProblemJobDocument = HydratedDocument<ProblemJobs>;

@Schema()
export class ProblemJobs implements ProblemJob {
  @Prop() createdAt: Date;

  @Prop()
  code: string;

  @Prop()
  language: 'c' | 'cpp' | 'java' | 'pythone' | 'node';

  @Prop()
  jobStatus: 'pending' | 'completed';

  @Prop()
  executionTime: number;

  @Prop()
  startedAt: Date;

  @Prop()
  completedAt: Date;

  @Prop()
  testCasesResult: [];

  @Prop()
  userId: string;

  @Prop()
  problemId: string;

  @Prop()
  jobId: string;

  @Prop() status: 'pending' | 'success';

  @Prop()
  result: 'passed' | 'partial' | 'failed';
}

export const ProblemJobSchema = SchemaFactory.createForClass(ProblemJobs);
