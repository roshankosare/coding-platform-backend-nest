import { Injectable } from '@nestjs/common';
import { CreateProblemDto } from './dto/create-problem.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';
import { Problem } from './entities/problem.entity';
import { ProblemRepository } from './problems.repository';
import { v4 as uuid } from 'uuid';
import { HttpResponse } from 'src/common/httpResponse';
import { HttpStatus } from '@nestjs/common/enums';

@Injectable()
export class ProblemsService {
  constructor(private readonly problemRepository: ProblemRepository) {}
  async create(createProblemDto: CreateProblemDto): Promise<HttpResponse> {
    const problemDto: Problem = {
      problemId: uuid(),
      title: createProblemDto.title,
      description: createProblemDto.description,
      sampleTestCase: createProblemDto.sampleTest,
      testCase: createProblemDto.testCases,
      likes: 0,
      dislikes: 0,
      autherId: createProblemDto.autherId,
    };
    const problem = await this.problemRepository.create(problemDto);

    if (!problem)
      return new HttpResponse({
        success: false,
        message: 'problem not created',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });

    return new HttpResponse({
      success: true,
      message: 'problem created',
      statusCode: HttpStatus.CREATED,
      data: problem,
    });
  }

  async find(problemFilterQuery: Partial<Problem>): Promise<HttpResponse> {
    const problems = await this.problemRepository.find(problemFilterQuery);
    return new HttpResponse({
      success: true,
      message: 'problems fetched',
      statusCode: HttpStatus.OK,
      data: problems,
    });
  }

  async findWithAggrigation(
    problemFilterQuery: Partial<Problem>,
  ): Promise<HttpResponse> {
    const problems = await this.problemRepository.findWithAggrigattion([
      {
        $lookup: {
          from: 'users',
          localField: 'autherId',
          foreignField: 'userId',
          as: 'user',
          pipeline: [
            {
              $project: { username: 1 },
            },
          ],
        },
      },
      {
        $unwind: '$user',
      },
    ]);
    return new HttpResponse({
      success: true,
      message: 'problems fetched',
      statusCode: HttpStatus.OK,
      data: problems,
    });
  }

  async findOne(problemFilterQuery: Partial<Problem>): Promise<HttpResponse> {
    const problem = await this.problemRepository.findOne(problemFilterQuery);
    if (!problem)
      return new HttpResponse({
        success: false,
        message: 'cannot find problem',
        statusCode: HttpStatus.NOT_FOUND,
      });

    return new HttpResponse({
      success: true,
      message: 'problem fetched',
      statusCode: HttpStatus.OK,
      data: problem,
    });
  }


  async findOneWithoutHttpResponse(problemFilterQuery: Partial<Problem>) {
    const problem = await this.problemRepository.findOne(problemFilterQuery);
   return problem;
  }

  async update(
    problemFilterQuery: Partial<Problem>,
    updateProblemDto: Partial<Problem>,
    userId: string,
  ): Promise<HttpResponse> {
    const problem = await this.problemRepository.findOne(problemFilterQuery);

    if (!problem)
      return new HttpResponse({
        success: false,
        message: 'canaot found problem',
        statusCode: HttpStatus.BAD_REQUEST,
      });

    if (problem.autherId !== userId)
      return new HttpResponse({
        success: false,
        message: 'you are not legit user to update this problem',
        statusCode: HttpStatus.FORBIDDEN,
      });

    return new HttpResponse({
      success: true,
      message: 'problem updated',
      statusCode: HttpStatus.OK,
      data: problem,
    });
  }

  async remove(
    problemFilterQuery: Partial<Problem>,
    userId: string,
  ): Promise<HttpResponse> {
    const problem = await this.problemRepository.findOne(problemFilterQuery);
    if (!problem)
      return new HttpResponse({
        success: false,
        message: 'problem not found',
        statusCode: HttpStatus.BAD_REQUEST,
      });

    if (problem.autherId !== userId)
      return new HttpResponse({
        success: false,
        message: 'not a auther of this problem',
        statusCode: HttpStatus.BAD_REQUEST,
      });

    await problem.delete();

    return new HttpResponse({
      success: true,
      message: 'problem deleted',
      statusCode: HttpStatus.OK,
      data: problem,
    });
  }
}
