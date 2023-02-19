import { InjectQueue } from '@nestjs/bull/dist/decorators';
import { HttpStatus, Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { HttpResponse } from 'src/common/httpResponse';
import { CreateCodeRunDto } from './dto/create-code-run.dto';
import { JobServie } from './job/job.service';
import { CodeRunValidationService } from './run-code-validation.service';

@Injectable()
export class CodeRunService {
  constructor(
    @InjectQueue('jobs') private readonly jobQuue: Queue,
    private readonly jobService: JobServie,
    private readonly codeRunValiidationServie: CodeRunValidationService,
  
  ) {}

  async runCodeAll(codeRunDto: CreateCodeRunDto): Promise<HttpResponse> {
    const errors = this.codeRunValiidationServie.validateRunCodeDto(codeRunDto);
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
}
