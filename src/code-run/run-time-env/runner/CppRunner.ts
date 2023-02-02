import { spawn } from 'child_process';
import { RunnerResult } from '../runner-result.type';
import { RunnerBaseClass } from './RunnerBaseClass';
import * as path from 'path';
import * as fs from 'fs';
import { PathAndTool } from './types';
import { join } from 'path';

export class CppRunner extends RunnerBaseClass {
  outputFilepath: string;
  static dirCompilerOutput: string;

  async getRunFilePathAndTool(filepath: string): Promise<PathAndTool | null> {
    CppRunner.dirCompilerOutput = join(process.cwd(), 'executables');

    try {
      const result = await this.compile(filepath);
      return { exeFilepath: result.compiledFilePath };
    } catch (e) {
      return { error: e };
    }
  }

  async compile(filepath: string): Promise<{ compiledFilePath: string }> {
    if (!fs.existsSync(CppRunner.dirCompilerOutput))
      fs.mkdirSync(CppRunner.dirCompilerOutput);

    this.outputFilepath = path.basename(filepath).split('.')[0];
    this.outputFilepath = `${this.outputFilepath}.out`;
    this.outputFilepath = join(
      CppRunner.dirCompilerOutput,
      this.outputFilepath,
    );
    return new Promise((resolve, reject) => {
      const compiler = spawn('g++', [filepath, '-o', this.outputFilepath]);
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

    // if (isCompiled)
    //   return { compiledFilePath: this.outputFilepath, error: null };
    // if (error) return { compiledFilePath: null, error: error };
  }
}
