import { exec, spawn } from 'child_process';
import path from 'path';

import { RunnerResult } from '../runner-result.type';

export abstract class RunnerBaseClass {
  abstract BuildContainerAndGetDockerContainerName(): Promise<string>;

  result: RunnerResult = {
    status: 'pending',
  };
  containerName: string;

  async buildContainer(): Promise<boolean> {
    try {
      this.containerName = await this.BuildContainerAndGetDockerContainerName();
      return Promise.resolve(true);
    } catch (error) {
      console.log(error);

      this.result.completedAt = Date.now();
      this.result.status = 'completed';
      this.result.output = error;

      return Promise.reject(this.result);
    }
  }

  async run(input?: string): Promise<RunnerResult | null> {
   
    return new Promise((resolve, reject) => {
      // const process = spawn(getresult.exeFilepath);
     

      const process = spawn('docker', ['run',"-i", this.containerName,]);
      // const process = exec(`docker run -it ${this.containerName}`);
      const timeout = setTimeout(async () => {
        try {
          process.kill();
          this.result.completedAt = Date.now();
          this.result.output = 'time litmit exceded';
        } catch (err) {
          console.log(err);
        }
      }, 3 * 1000);

      process.stdout.on('data', (data) => {
        const output = data.toString();
        console.log(output);
        this.result.completedAt = Date.now();
        this.result.status = 'completed';
        this.result.output = output;
      });
      process.stderr.on('data', (data) => {
        const output = data.toString();
        console.log(output);
        this.result.completedAt = Date.now();
        this.result.status = 'completed';
        this.result.output = output;
      });

      process.on('error', (error) => {
        console.log(error)
        const output = error.toString();
        reject(this.result);
      });

      process.on('exit', async (code) => {
        // clearTimeout(timeout);
        if (code === 0) {
          resolve(this.result);
        }
        if (code === 1) {
          reject(this.result);
        }
      });

      if (input) {
        try {
          process.stdin.write(input);
        } catch (err) {
          console.log('can not write to stream');
        }
      }

      process.stdin.end();
    });
  }
}
