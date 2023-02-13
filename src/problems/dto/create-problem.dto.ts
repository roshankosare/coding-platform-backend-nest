import { TestCase } from "../entities/problem.entity";


export class CreateProblemDto {
    title:string;
    description:string;
    sampleInputTest:TestCase;
    testCases:[TestCase];
}
