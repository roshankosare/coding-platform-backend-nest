import { spawn } from 'child_process';
import { RunnerBaseClass } from './RunnerBaseClass';
import { join } from 'path';

export class CppRunner extends RunnerBaseClass {
  BuildContainerAndGetDockerContainerName(): Promise<string> {
    let error: string;

    const wrkdir = join(process.cwd(), 'source-codes', 'cpp');
    const container = 'cppruntime';

    return new Promise((resolve, reject) => {
      const buildContainer = spawn('docker', [
        'build',
        '-t',
        container,
        wrkdir,
      ]);

      buildContainer.stdout.on("error", (data) => {
        const output = data.toString();
        console.log(error);
        console.log(output)
      });
      buildContainer.stderr.on('data', (data) => {
        
        const output = data.toString();
        console.log(output)
        error = output;
      });

      buildContainer.on('error', (error) => {
        const output = error.toString();
        console.log(error)
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
