export class CreateCodeRunDto {
  code: string;
  language:'c' | 'cpp' | 'java' | 'pythone' | 'node' ;
}

export class CreateSubmitProblemDto{
  code: string;
  language:'c' | 'cpp' | 'java' | 'pythone' | 'node' ;
  problemId:string;
}