import { Test, TestingModule } from '@nestjs/testing';
import { ProblemjobService } from './problemjob.service';

describe('ProblemjobService', () => {
  let service: ProblemjobService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProblemjobService],
    }).compile();

    service = module.get<ProblemjobService>(ProblemjobService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
