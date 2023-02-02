import { Module } from '@nestjs/common';
import { CodeRunService } from './code-run.service';
import { CodeRunController } from './code-run.controller';
import { RunTimeEnv } from './run-time-env/run-time-env.service';
import { JobModule } from './job/job.module';
import { BullModule } from '@nestjs/bull';
import { JobConsumer } from './jobQueue/Job.consumer';
import { CodeRunValidationService } from './run-code-validation.service';

@Module({
  imports: [
    JobModule,
    BullModule.registerQueue({
      name: 'jobs',
    }),
  ],
  controllers: [CodeRunController],
  providers: [CodeRunService, RunTimeEnv,JobConsumer,
  CodeRunValidationService],
})
export class CodeRunModule {}
