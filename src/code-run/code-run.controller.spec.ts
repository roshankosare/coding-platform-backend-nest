import { Test, TestingModule } from '@nestjs/testing';
import { CodeRunController } from './code-run.controller';
import { CodeRunService } from './code-run.service';

describe('CodeRunController', () => {
  let controller: CodeRunController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CodeRunController],
      providers: [CodeRunService],
    }).compile();

    controller = module.get<CodeRunController>(CodeRunController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
