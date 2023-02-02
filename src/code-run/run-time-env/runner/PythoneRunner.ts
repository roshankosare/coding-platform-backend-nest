import { RunnerBaseClass } from './RunnerBaseClass';
import { PathAndTool } from './types';

export class PythoneRunner extends RunnerBaseClass {
  async getRunFilePathAndTool(filepath: string): Promise<PathAndTool | null> {
    return { exeFilepath: filepath, tool: 'py' };
  }
}
