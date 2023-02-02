import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Jobs, JobSchema } from "./entity/job.entity-mongo";
import { JobRepository } from "./job.repository";
import { JobServie } from "./job.service";



@Module({
    imports:[ MongooseModule.forFeature([
        { name:Jobs.name, schema: JobSchema },
      ]),],
    providers:[JobServie,JobRepository],
    exports:[JobServie]
})
export class JobModule{}