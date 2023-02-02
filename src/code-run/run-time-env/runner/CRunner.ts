import { RunnerBaseClass } from './RunnerBaseClass';
import { PathAndTool } from './types';
import * as path from 'path';
import * as fs from 'fs';
import { spawn } from 'child_process';
import { join } from 'path';

export class CRunner extends RunnerBaseClass {
  outputFilepath: string;
  static dirCompilerOutput: string;

  async getRunFilePathAndTool(filepath: string): Promise<PathAndTool | null> {
    CRunner.dirCompilerOutput = join(process.cwd(), 'executables');

    try {
      const result = await this.compile(filepath);
      return { exeFilepath: result.compiledFilePath };
    } catch (e) {
      return { error: e };
    }
  }

  async compile(filepath: string): Promise<{ compiledFilePath: string }> {
    if (!fs.existsSync(CRunner.dirCompilerOutput))
      fs.mkdirSync(CRunner.dirCompilerOutput);

    this.outputFilepath = path.basename(filepath).split('.')[0];
    this.outputFilepath = `${this.outputFilepath}.out`;
    this.outputFilepath = join(
      CRunner.dirCompilerOutput,
      this.outputFilepath,
    );
    return new Promise((resolve, reject) => {
      const compiler = spawn('gcc', [filepath, '-o', this.outputFilepath]);
      if (compiler) {
        compiler.stderr.on('data', (data) => {
          const error = data.toString();
          reject(error);
        });

        compiler.on('error', (e) => {
          const error = e.toString();
          reject(error);
        });

        compiler.on('exit', (code) => {
          if (code === 0) 
          resolve({ compiledFilePath: this.outputFilepath });
        });
      }
    });

    
  }
}
