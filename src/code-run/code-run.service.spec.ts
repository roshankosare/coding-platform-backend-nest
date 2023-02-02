import { Test, TestingModule } from '@nestjs/testing';
import { CodeRunService } from './code-run.service';

describe('CodeRunService', () => {
  let service: CodeRunService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CodeRunService],
    }).compile();

    service = module.get<CodeRunService>(CodeRunService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
