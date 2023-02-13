import { Test, TestingModule } from '@nestjs/testing';
import { ProblemjobController } from './problemjob.controller';
import { ProblemjobService } from './problemjob.service';

describe('ProblemjobController', () => {
  let controller: ProblemjobController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProblemjobController],
      providers: [ProblemjobService],
    }).compile();

    controller = module.get<ProblemjobController>(ProblemjobController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
