import { spawn } from 'child_process';
import { join } from 'path';
import { RunnerBaseClass } from './RunnerBaseClass';

export class NodeRunner extends RunnerBaseClass {
  BuildContainerAndGetDockerContainerName(): Promise<string> {
    let error: string;

    const wrkdir = join(process.cwd(), 'source-codes', 'node');
    console.log(wrkdir)
    const container = 'noderuntime';

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
        console.log(output)
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
