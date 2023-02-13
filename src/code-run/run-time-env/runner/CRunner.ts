import { RunnerBaseClass } from './RunnerBaseClass';

import { spawn } from 'child_process';
import { join } from 'path';

export class CRunner extends RunnerBaseClass {
  BuildContainerAndGetDockerContainerName(): Promise<string> {
    let error: string;

    const wrkdir = join(process.cwd(), 'source-codes', 'c');
    const container = 'cruntime';

    return new Promise((resolve, reject) => {
      const buildContainer = spawn('docker', [
        'build',
        '-t',
        container,
        wrkdir,
      ]);

      buildContainer.stdout.on("error", (data) => {
        
        const output = data.toString();
        console.log(output)
      });
      buildContainer.stderr.on("data", (data) => {

        const output = data.toString();
        error = output;
        console.log(output)
      });

      buildContainer.on('error', (error) => {
        // const output = error.toString();
        // console.log(output)
      });

      buildContainer.on('exit', async (code) => {
        // clearTimeout(timeout);
        if (code === 0) {
          resolve(container);
        }
        if (code === 1) {
          reject(error);
        }
      });
    });
  }
 
}
