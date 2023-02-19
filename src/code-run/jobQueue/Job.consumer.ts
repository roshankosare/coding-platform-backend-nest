import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { JobServie } from '../job/job.service';
import { RunTimeEnv } from '../run-time-env/run-time-env.service';
import { generateFile } from '../run-time-env/utils/generateFile';

@Processor('jobs')
export class JobConsumer {
  constructor(
    private readonly jobService: JobServie,
    private readonly runTimeEnv: RunTimeEnv,
  ) {}
  @Process()
  async runCode(job: Job<{ jobId: string }>) {
    const currentJob = await this.jobService.findOne({ jobId: job.data.jobId });

    generateFile(currentJob.language, currentJob.code);
    const runnerResult = await this.runTimeEnv.run({
      language: currentJob.language,
    });
   

    await this.jobService.findOneAndUpdate(
      { jobId: job.data.jobId },
      { jobStatus: 'completed', output: runnerResult.output },
    );
  }
}
