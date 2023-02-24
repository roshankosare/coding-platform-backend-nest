import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { Job, Queue } from 'bull';
import { RunTimeEnvTest } from 'src/code-run/run-time-env/run-time-env-test.service';
import { RunnerBaseClass } from 'src/code-run/run-time-env/runner/RunnerBaseClass';
import { generateFile } from 'src/code-run/run-time-env/utils/generateFile';
import { ProblemsService } from 'src/problems/problems.service';
import { ProblemjobService } from './problemjob.service';

type jobResult = 'passed' | 'partial' | 'failed' | 'evaluating';

@Processor('problemJobs')
export class ProblemJobConsumer {
  constructor(
    private readonly problemJobService: ProblemjobService,
    private readonly runTimeEnv: RunTimeEnvTest,
    private readonly problemService: ProblemsService,
  ) {}
  result: jobResult = 'failed';
  @Process()
  async runCode(job: Job<{ jobId: string }>) {
    const currentJob = await this.problemJobService.findOne({
      jobId: job.data.jobId,
    });

    const problem = await this.problemService.findOneWithoutHttpResponse({
      problemId: currentJob.problemId,
    });

    generateFile(currentJob.language, currentJob.code);
    const runnerResult: any[] = await this.runTimeEnv.run({
      language: currentJob.language,
      testCaseArray: problem.testCase,
    });

    for (let i = 0; i < runnerResult.length; i++) {
      if (runnerResult[i].status === 'pass') {
        this.result = 'passed';
        break;
      }
    }
    for (let i = 0; i < runnerResult.length; i++) {
      if (runnerResult[i].status === 'fail' && this.result === "passed") {
        this.result = 'partial';
        break;
      }
    }

    await this.problemJobService.findOneAndUpdate(
      { jobId: job.data.jobId },
      { jobStatus: 'completed', testCasesResult: runnerResult,result:this.result },
    );
  }
}
