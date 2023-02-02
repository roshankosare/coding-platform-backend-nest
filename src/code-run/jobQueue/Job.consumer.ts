import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { JobServie } from '../job/job.service';
import { RunTimeEnv } from '../run-time-env/run-time-env.service';

@Processor('jobs')
export class JobConsumer {
  constructor(
    private readonly jobService: JobServie,
    private readonly runTimeEnv: RunTimeEnv,
  ) {}
  @Process()
  async runCode(job: Job<{ jobId: string }>) {
    const currentJob = await this.jobService.findOne({ jobId: job.data.jobId });

    const runnerResult = await this.runTimeEnv.run({
      language: currentJob.language,
      filepath: currentJob.filepath,
    });
    

    await  this.jobService.findOneAndUpdate(
      { jobId: job.data.jobId },
      { jobStatus: 'completed', output: runnerResult.output }
    );
  }
}
