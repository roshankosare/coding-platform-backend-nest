import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CodeRunService } from './code-run.service';
import { CreateCodeRunDto } from './dto/create-code-run.dto';

@Controller('run-time-env')
export class CodeRunController {
  constructor(private readonly codeRunService: CodeRunService) {}

  @Post('runall')
  async runCodeAll(@Body() createCodeRunDto: CreateCodeRunDto) {
   
    return await this.codeRunService.runCodeAll(createCodeRunDto);
  }
}
