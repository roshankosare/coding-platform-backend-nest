import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProblemsService } from './problems.service';
import { CreateProblemDto } from './dto/create-problem.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';
import { Req, Res, UseGuards } from '@nestjs/common/decorators';
import { JwtAuthGuard } from 'src/jwt/jwtGuard';
import { Request, Response } from 'express';
import { CurrentUser } from 'src/common/currentUserType';

@Controller('problems')
export class ProblemsController {
  constructor(private readonly problemsService: ProblemsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createProblemDto: CreateProblemDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const user = <CurrentUser>req.user;
    createProblemDto.autherId = user.userId;
    const response = await this.problemsService.create(createProblemDto);
    return res.status(response.statusCode).json(response);
  }

  @Get()
  async findAll(@Req() req: Request, @Res() res: Response) {
    const response = await this.problemsService.findWithAggrigation({});
    return res.status(response.statusCode).json(response);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const response = await this.problemsService.findOne({ problemId: id });
    return res.status(response.statusCode).json(response);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProblemDto: UpdateProblemDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const user = <CurrentUser>req.user;

    const response = await this.problemsService.update(
      { problemId: id },
      updateProblemDto,
      user.userId,
    );
    return res.status(response.statusCode).json(response);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const user = <CurrentUser>req.user;
    const response = await this.problemsService.remove(
      { problemId: id },
      user.userId,
    );
    return res.status(response.statusCode).json(response);
  }
}
