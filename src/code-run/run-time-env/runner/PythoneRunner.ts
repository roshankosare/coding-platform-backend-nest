import { spawn } from 'child_process';
import { join } from 'path';
import { RunnerBaseClass } from './RunnerBaseClass';

export class PythoneRunner extends RunnerBaseClass {
  BuildContainerAndGetDockerContainerName():  Promise<string> {
    let error: string;

    const wrkdir = join(process.cwd(), 'source-codes', 'pythone');
    const container = 'pyruntime';

    return new Promise((resolve, reject) => {
      const buildContainer = spawn('docker', [
        'build',
        '-t',
        container,
        wrkdir,
      ]);

      buildContainer.stdout.on('data', (data) => {
        const output = data.toString();
        console.log(error);
      });
      buildContainer.stderr.on('data', (data) => {
        const output = data.toString();
        error = output;
        
      });

      buildContainer.on('error', (error) => {
        const output = error.toString();
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
