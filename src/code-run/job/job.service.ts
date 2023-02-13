import { Injectable } from '@nestjs/common';

import { Job } from './entity/job.entity';
import { JobRepository } from './job.repository';
import { v4 as uuid } from 'uuid';
import { generateFile } from '../run-time-env/utils/generateFile';

@Injectable()
export class JobServie {
  constructor(private readonly jobRepository: JobRepository) {}

  async createJob(createJobDto: Partial<Job>): Promise<Job> {
    // const filepath = generateFile(createJobDto.language, createJobDto.code);
    let job: Job;
    
      job = {
        createdAt: new Date(),
        jobId: uuid(),
        code: createJobDto.code,
        language: createJobDto.language,
        jobStatus: 'pending',
        errors: null,
        executionTime: 0,
        userId: '',
        startedAt: null,
        completedAt: null,
        output: '',
      };
    

    return await this.jobRepository.create(job);
  }

  async findOneAndUpdate(
    jobFilterQuery: Partial<Job>,
    updateJObDto: Partial<Job>,
  ): Promise<Job> {
    return await this.jobRepository.findOneAndUpdate(
      jobFilterQuery,
      updateJObDto,
    );
  }

  async findOne(jobFilterQuery: Partial<Job>): Promise<Job> {
    return await this.jobRepository.findOne(jobFilterQuery);
  }

  async find(jobFilterQuery: Partial<Job>): Promise<Job[]> {
    return await this.jobRepository.find(jobFilterQuery);
  }

  async deleteOne(jobFilterQuery: Partial<Job>): Promise<Job> {
    return await this.jobRepository.findOneAndDelete(jobFilterQuery);
  }

  async deleteMany(jobFilterQuery: Partial<Job>): Promise<number> {
    return await this.jobRepository.deleteMany(jobFilterQuery);
  }
}
