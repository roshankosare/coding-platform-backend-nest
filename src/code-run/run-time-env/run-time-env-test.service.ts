import { Injectable } from '@nestjs/common';
import { RunnerFactory } from './RunnerFactory';

type TestResult = {
  input: string;
  expectedOutput: string;
  outputed: string;
  status: string;
};

@Injectable()
export class RunTimeEnvTest {
  codeRunner: RunnerFactory;
  async run({
    language,
    testCaseArray,
  }: {
    language: string;
    testCaseArray:any [];
  }) {
    
  
    this.codeRunner = new RunnerFactory();
    const runner = this.codeRunner.CreateRunner(language);

    try {
      const executionResult: TestResult[] = [];
      await runner.buildContainer();
      for (let i = 0; i < testCaseArray.length; i++) {
       

        const result = await runner.run(testCaseArray[i].input);
       
      
        if (result.output !== testCaseArray[i].output) {
          executionResult.push({
            input: testCaseArray[i].input,
            outputed: result.output,
            expectedOutput: testCaseArray[i].output,
            status: 'fail',
          });
        
          continue;
        }
        executionResult.push({
          input: testCaseArray[i].input,
          outputed: result.output,
          expectedOutput: testCaseArray[i].output,
          status: 'pass',
        });
      }
      return executionResult;
    } catch (result) {
      return result;
    }
  }
}
