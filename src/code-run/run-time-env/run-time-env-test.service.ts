import { Injectable } from '@nestjs/common';
import { RunnerFactory } from './RunnerFactory';

@Injectable()
export class RunTimeEnvTest {
  codeRunner: RunnerFactory;
  async run({
    language,
    testCaseArray,
  }: {
    language: string;
    testCaseArray: [any];
  }) {
    this.codeRunner = new RunnerFactory();
    const runner = this.codeRunner.CreateRunner(language);

    try {
      let executionResult: any;
      await runner.buildContainer();
      testCaseArray.every(async (testCase) => {
        let testResult: any;
        const result = await runner.run();
        if (result.output !== testCase.output) {
          testResult.input = testCase.input;
          testResult.expectedOutput = testCase.output;
          testResult.outputed = result.output;
          testResult.status = 'passed';
          executionResult.push(testResult);
          return;
        }
        testResult.input = testCase.input;
        testResult.expectedOutput = testCase.output;
        testResult.outputed = result.output;
        testResult.status = 'passed';
        executionResult.push(testResult);
        return;
      });

      return executionResult;
    } catch (result) {
      return result;
    }
  }
}
