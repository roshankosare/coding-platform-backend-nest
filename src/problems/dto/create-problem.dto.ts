import { TestCase } from "../entities/problem.entity";


export class CreateProblemDto {
    autherId?:string;
    title:string;
    description:string;
    sampleTest:TestCase;
    testCases:[TestCase];
}
