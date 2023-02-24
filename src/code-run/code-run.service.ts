import { InjectQueue } from '@nestjs/bull/dist/decorators';
import { HttpStatus, Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { HttpResponse } from 'src/common/httpResponse';
import { ProblemjobService } from 'src/problemjob/problemjob.service';
import { CreateProblemDto } from 'src/problems/dto/create-problem.dto';
import { CreateCodeRunDto, CreateSubmitProblemDto } from './dto/create-code-run.dto';
import { JobServie } from './job/job.service';
import { CodeRunValidationService } from './run-code-validation.service';

@Injectable()
export class CodeRunService {
  constructor(
    @InjectQueue('jobs') private readonly jobQuue: Queue,
    @InjectQueue('problemJobs') private readonly problemJobQuue: Queue,
    private readonly jobService: JobServie,
    private readonly codeRunValiidationServie: CodeRunValidationService,
    private readonly problemJobService:ProblemjobService
  
  ) 
  {
    this.problemJobQuue.empty();
    this.jobQuue.empty();
  }

  async runCodeAll(codeRunDto: CreateCodeRunDto): Promise<HttpResponse> {
    const errors:string[] = this.codeRunValiidationServie.validateRunCodeDto(codeRunDto);
    console.log(errors)

    // if (errors.length > 0)
    //   return new HttpResponse({
    //     success: false,
    //     statusCode: HttpStatus.BAD_REQUEST,
    //     message: 'invalid payload',
    //   });

    const { code, language } = codeRunDto;

    const result = await this.jobService.createJob({
      code: code,
      language: language,
    });

    if (!result)
      return new HttpResponse({
        success: false,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      });

    await this.jobQuue.add({
      jobId: result.jobId,
    });

    return new HttpResponse({
      success: true,
      message: 'job created',
      statusCode: HttpStatus.CREATED,
      data: {
        jobId: result.jobId,
      },
    });
  }

  async submitCodeAll(createSubmitProblemDto:CreateSubmitProblemDto): Promise<HttpResponse> {
    // const errors:string[] = this.codeRunValiidationServie.validateRunCodeDto(codeRunDto);
    // console.log(errors)

    // if (errors.length > 0)
    //   return new HttpResponse({
    //     success: false,
    //     statusCode: HttpStatus.BAD_REQUEST,
    //     message: 'invalid payload',
    //   });

    const { code, language ,problemId} = createSubmitProblemDto;

    const result = await this.problemJobService.create({
      code: code,
      language: language,
      userId:"jksdvjkbks",
      porblemId:problemId
    });

    if (!result)
      return new HttpResponse({
        success: false,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      });

    await this.problemJobQuue.add({
      jobId: result.jobId,
    });
   

    return new HttpResponse({
      success: true,
      message: 'job created',
      statusCode: HttpStatus.CREATED,
      data: {
        jobId: result.jobId,
      },
    });
  }

  async getJobStatus(id:string){
    const result = await this.jobService.findOne({ jobId: id });
    if (!result)
      return new HttpResponse({
        success: false,
        message: 'invalid job id',
        statusCode: HttpStatus.BAD_REQUEST,
      });

    return new HttpResponse({
      success: true,
      message: 'fetched job',
      statusCode: HttpStatus.OK,
      data: result,
    });
  }


  async getSubmitJobStatus(id:string){
    const result = await this.problemJobService.findOne({ jobId: id });
    if (!result)
      return new HttpResponse({
        success: false,
        message: 'invalid job id',
        statusCode: HttpStatus.BAD_REQUEST,
      });

    return new HttpResponse({
      success: true,
      message: 'fetched job',
      statusCode: HttpStatus.OK,
      data: result,
    });
  }
}
