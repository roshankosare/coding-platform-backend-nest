import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
} from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { Request, Response } from 'express';
import { HttpResponse } from 'src/common/httpResponse';
import { CodeRunService } from './code-run.service';
import { CreateCodeRunDto } from './dto/create-code-run.dto';
import { JobServie } from './job/job.service';

@Controller('code')
export class CodeRunController {
  constructor(private readonly codeRunService: CodeRunService) {}

  @Post('run')
  async runCodeAll(
    @Body() createCodeRunDto: CreateCodeRunDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const response = await this.codeRunService.runCodeAll(createCodeRunDto);
    return res.status(response.statusCode).json(response);
  }

  @Get(':id')
  async getJobStatus(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const response = await this.codeRunService.getJobStatus(id);

    return res.status(response.statusCode).json(response);
  }
}
