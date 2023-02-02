import { Injectable } from '@nestjs/common';
import { RunnerFactory } from './RunnerFactory';

@Injectable()
export class RunTimeEnv {
  codeRunner: RunnerFactory;
  async run({ language, filepath }: { language: string; filepath: string }) {
    this.codeRunner = new RunnerFactory();
    const runner = this.codeRunner.CreateRunner(language);

    try {
      const result = await runner.run(filepath);

      return result;
    } catch (result) {
      return result;
    }
  }
}
