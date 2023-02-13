import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProblemjobService } from './problemjob.service';
import { CreateProblemjobDto } from './dto/create-problemjob.dto';
import { UpdateProblemjobDto } from './dto/update-problemjob.dto';

@Controller("problem")
export class ProblemjobController {
  constructor(private readonly problemjobService: ProblemjobService) {}

  @Post("submit")
  create(@Body() createProblemjobDto: CreateProblemjobDto) {

    return this.problemjobService.create(createProblemjobDto);
  }

  @Get()
  findAll() {
    return this.problemjobService.findAll({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.problemjobService.findOne({jobId:id});
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProblemjobDto: UpdateProblemjobDto) {
  //   return this.problemjobService.findOneAndUpdate(+id, updateProblemjobDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.problemjobService.remove(+id);
  // }
}
