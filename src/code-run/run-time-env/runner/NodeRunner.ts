import { RunnerBaseClass } from './RunnerBaseClass';
import { PathAndTool } from './types';

export class NodeRunner extends RunnerBaseClass {
  async getRunFilePathAndTool(filepath: string): Promise<PathAndTool | null> {
    return { exeFilepath: filepath, tool: 'node' };
  }
}
