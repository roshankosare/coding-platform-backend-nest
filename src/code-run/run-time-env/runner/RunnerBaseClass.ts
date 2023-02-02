import { spawn } from 'child_process';
import { RunnerResult } from '../runner-result.type';
import { PathAndTool } from './types';
import * as fs from 'fs';

export abstract class RunnerBaseClass {
  abstract getRunFilePathAndTool(filepath: string): Promise<PathAndTool | null>;

  async run(filepath: string): Promise<RunnerResult | null> {
    let result: RunnerResult = {
      status: 'pending',
    };
    const getresult = await this.getRunFilePathAndTool(filepath);

    if (getresult.error) {
      result.errors = getresult.error;
      result.output = getresult.error;
      result.completedAt = Date.now();
      result.status = 'completed';
      return result;
    }

    if (getresult.tool === undefined || null) {
      return new Promise((resolve, reject) => {
        const process = spawn(getresult.exeFilepath);
        const timeout = setTimeout(async () => {
          try {
            process.kill();
            result.completedAt = Date.now();
            result.output = 'time litmit exceded';
          } catch (err) {
            console.log(err);
          }
        }, 2 * 1000);

        process.stdout.on('data', (data) => {
          const output = data.toString();
          result.completedAt = Date.now();
          result.status = 'completed';
          result.output = output;
        });
        process.stderr.on('data', (data) => {
          const output = data.toString();
          result.completedAt = Date.now();
          result.status = 'completed';
          result.output = output;
        });

        process.on('error', (error) => {
          console.log(error);
          reject(result);
        });

        process.on('exit', async (code) => {
          fs.unlink(getresult.exeFilepath, (err) => {
            if (err) console.log(err);
          });
          fs.unlink(filepath, (err) => {
            if (err) console.log(err);
          });

          clearTimeout(timeout);
          if (code === 0) {
            resolve(result);
          }
          if (code === 1) {
            reject(result);
          }
        });

        // try {
        //   process.stdin.write(job['input']);
        // } catch (err) {
        //   console.log('can not write to stream');
        // }

        process.stdin.end();
      });
    }

    if (getresult.tool) {
      return new Promise((resolve, reject) => {
        const process = spawn(getresult.tool, [filepath]);
        const timeout = setTimeout(async () => {
          try {
            process.kill();
            result.completedAt = Date.now();
          } catch (err) {
            console.log(err);
          }
        }, 2 * 1000);

        process.stdout.on('data', (data) => {
          const output = data.toString();
          result.completedAt = Date.now();
          result.status = 'completed';
          result.output = output;
        });
        process.stderr.on('data', (data) => {
          const output = data.toString();
          result.completedAt = Date.now();
          result.status = 'completed';
          result.output = output;
        });

        process.on('error', (err) => {
          console.log(err);
          reject(result);
        });

        process.on('exit', async (code) => {
          fs.unlink(getresult.exeFilepath, (err) => {
            if (err) console.log(err);
          });

          clearTimeout(timeout);
          if (code === 0) resolve(result);

          if (code === 1) {
            reject(result);
          }
        });

        // try {
        //   process.stdin.write(job['input']);
        // } catch (err) {
        //   console.log('can not write to stream');
        // }

        process.stdin.end();
      });
    }
  }
}
