import { Module } from '@nestjs/common';
import { ProblemsService } from './problems.service';
import { ProblemsController } from './problems.controller';
import { ProblemRepository } from './problems.repository';
import { Problems, ProblemSchema } from './entities/problem.mongo.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthencationModule } from 'src/jwt/authentication.module';

@Module({
  imports:[ MongooseModule.forFeature([
    { name:Problems.name, schema: ProblemSchema },
  ]),AuthencationModule],
  controllers: [ProblemsController],
  providers: [ProblemsService,ProblemRepository],
  exports:[ProblemsService]
})
export class ProblemsModule {}
