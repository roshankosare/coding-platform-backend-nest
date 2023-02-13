import { Module } from '@nestjs/common';
import { RunTimeEnvTest } from './run-time-env-test.service';
import { RunTimeEnv } from './run-time-env.service';

@Module({
    providers:[RunTimeEnv, RunTimeEnvTest],
  exports: [RunTimeEnv, RunTimeEnvTest],
})
export class RunTimeEnvModule {}
