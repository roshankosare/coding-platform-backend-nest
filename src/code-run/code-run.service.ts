import { InjectQueue } from '@nestjs/bull/dist/decorators';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
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

  async runCodeAll(codeRunDto: CreateCodeRunDto) {
    const errors = this.codeRunValiidationServie.validateRunCodeDto(codeRunDto);

    // if (errors.length > 0) return errors;

    const { code, language } = codeRunDto;

    const result = await this.jobService.createJob({
      code: code,
      language: language,
    });

    if (!result) return;

    await this.jobQuue.add({
      jobId: result.jobId,
    });

    return result;
  }
}
