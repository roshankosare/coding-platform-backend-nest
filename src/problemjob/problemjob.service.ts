import { Injectable } from '@nestjs/common';
import { CreateProblemjobDto } from './dto/create-problemjob.dto';
import { UpdateProblemjobDto } from './dto/update-problemjob.dto';
import { ProblemJob } from './entities/problemjob.entity';
import { ProblemJobRepository } from './problem-job.repository';
import { v4 as uuid } from 'uuid';
import { ProblemJobConsumer } from './problem-job.consumer';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class ProblemjobService {
  constructor(
    @InjectQueue('problemJobs') private readonly jobQueue: Queue,
    private readonly problemJobRepository: ProblemJobRepository,
    
  ) {}
  async create(
    createProblemjobDto: CreateProblemjobDto,
  ): Promise<ProblemJob | null> {
    const job: ProblemJob = {
      userId: createProblemjobDto.userId,
      problemId: createProblemjobDto.porblemId,
      jobStatus: 'pending',
      result: 'evaluating',
      jobId: uuid(),
      createdAt: undefined,
      code: createProblemjobDto.code,
      language: createProblemjobDto.language,
      executionTime: 0,
      startedAt: new Date(),
      completedAt: undefined,
      testCasesResult: [],
    };
    const newJob = await this.problemJobRepository.create(job);
    if (!newJob) return null;

    this.jobQueue.add({ jobId: newJob.jobId });
    return newJob;
  }

  async findAll(
    problemJobFileterQuery: Partial<ProblemJob>,
  ): Promise<ProblemJob[]> {
    return await this.problemJobRepository.find(problemJobFileterQuery);
  }

  async findOne(
    problemJobFileterQuery: Partial<ProblemJob>,
  ): Promise<ProblemJob> {
    return await this.problemJobRepository.findOne(problemJobFileterQuery);
  }

  async findOneAndUpdate(
    problemJobFileterQuery: Partial<ProblemJob>,
    updateProblemjobDto: Partial<ProblemJob>,
  ): Promise<ProblemJob> {
    return await this.problemJobRepository.findOneAndUpdate(
      problemJobFileterQuery,
      updateProblemjobDto,
    );
  }

  // async remove(id: number) {
  //   return this.problemJobRepository.findOneAndDelete({ problemId: id });
  // }
}
