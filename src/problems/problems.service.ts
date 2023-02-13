import { Injectable } from '@nestjs/common';
import { CreateProblemDto } from './dto/create-problem.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';
import { Problem } from './entities/problem.entity';
import { ProblemRepository } from './problems.repository';

@Injectable()
export class ProblemsService {
  constructor(private readonly problemRepository: ProblemRepository) {}
  async create(createProblemDto: CreateProblemDto) {
    return await this.problemRepository.create(createProblemDto);
  }

  async findAll(problemFilterQuery: Partial<Problem>) {
    return await this.problemRepository.find(problemFilterQuery);
  }

  async findOne(problemFilterQuery: Partial<Problem>) {
    return await this.problemRepository.findOne(problemFilterQuery);
  }

  async update(
    problemFilterQuery: Partial<Problem>,
    updateProblemDto: Partial<Problem>,
  ) {
    return await this.problemRepository.findOneAndUpdate(
      problemFilterQuery,
      updateProblemDto,
    );
  }

  async remove(problemFilterQuery: Partial<Problem>) {
    return this.problemRepository.findOneAndDelete(problemFilterQuery);
  }
}
