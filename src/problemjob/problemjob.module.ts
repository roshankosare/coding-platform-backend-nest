import { Module } from '@nestjs/common';
import { ProblemjobService } from './problemjob.service';
import { ProblemjobController } from './problemjob.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ProblemJobs,
  ProblemJobSchema,
} from './entities/problem-job.entity.mongo';
import { ProblemsModule } from 'src/problems/problems.module';
import { BullModule } from '@nestjs/bull';
import { RunTimeEnvModule } from 'src/code-run/run-time-env/run-time-env.module';
import { ProblemJobConsumer } from './problem-job.consumer';
import { ProblemJobRepository } from './problem-job.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProblemJobs.name, schema: ProblemJobSchema },
    ]),
    ProblemsModule,
    BullModule.registerQueue({
      name: 'problemJobs',
    }),
    RunTimeEnvModule
  ],
  controllers: [ProblemjobController],
  providers: [ProblemjobService,ProblemJobConsumer,ProblemJobRepository],
})
export class ProblemjobModule {}
