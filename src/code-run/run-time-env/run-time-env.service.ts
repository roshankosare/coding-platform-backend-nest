import { Injectable } from '@nestjs/common';
import { RunnerFactory } from './RunnerFactory';

@Injectable()
export class RunTimeEnv {
  codeRunner: RunnerFactory;
  async run({ language }: { language: string }) {
    this.codeRunner = new RunnerFactory();
    const runner = this.codeRunner.CreateRunner(language);

    try {
      await runner.buildContainer();
      const result = await runner.run();

      return result;
    } catch (result) {
       
      return result;
    }
  }
}
