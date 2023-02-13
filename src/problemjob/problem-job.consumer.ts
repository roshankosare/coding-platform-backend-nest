import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { RunTimeEnvTest } from 'src/code-run/run-time-env/run-time-env-test.service';
import { generateFile } from 'src/code-run/run-time-env/utils/generateFile';
import { ProblemsService } from 'src/problems/problems.service';
import { ProblemjobService } from './problemjob.service';

@Processor('problemJobs')
export class ProblemJobConsumer {
  constructor(
    private readonly problemJobService: ProblemjobService,
    private readonly runTimeEnv: RunTimeEnvTest,
    private readonly problemService: ProblemsService,
  ) {}
  @Process()
  async runCode(job: Job<{ jobId: string }>) {
    const currentJob = await this.problemJobService.findOne({
      jobId: job.data.jobId,
    });
    const problem = await this.problemService.findOne({
      problemId: currentJob.problemId,
    });

    generateFile(currentJob.language, currentJob.code);
    const runnerResult = await this.runTimeEnv.run({
      language: currentJob.language,
      testCaseArray: problem.testCase,
    });

    await this.problemJobService.findOneAndUpdate(
      { jobId: job.data.jobId },
      { jobStatus: 'completed', testCasesResult: runnerResult },
    );
  }
}
